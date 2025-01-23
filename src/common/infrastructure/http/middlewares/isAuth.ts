import { UnauthorizedError } from '@/common/domain/errors/unauthorized-error'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthProviderJwt } from '../../providers/auth-provider/auth-provider.jwt'

export function isAuth(
  request: Request,
  response: Response,
  _next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedError('Token is missing')
  }

  const [, access_token] = authHeader.split(' ')
  const authProviderJwt: AuthProviderJwt = container.resolve('AuthProviderJwt')
  const { user_id, roles } = authProviderJwt.verifyAuthKey(access_token)
  if (!user_id) {
    throw new UnauthorizedError('Invalid token')
  }

  request.user = {
    id: user_id,
    roles: roles,
  }

  return _next()
}
