import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '@/common/domain/errors/unauthorized-error'

export function hasRole(requiredRoles: string[]) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const user = request.user

    if (!user || !user.roles) {
      return next(new UnauthorizedError('User roles are missing'))
    }

    const hasRequiredRole = requiredRoles.some((role) =>
      user.roles.includes(role),
    )

    if (!hasRequiredRole) {
      return next(new UnauthorizedError('Access denied'))
    }

    return next()
  }
}
