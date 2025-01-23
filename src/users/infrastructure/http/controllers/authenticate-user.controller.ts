import { AuthProviderJwt } from '@/common/infrastructure/providers/auth-provider/auth-provider.jwt'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { AuthenticateUserUseCase } from '@/users/application/usecases/authenticate-user.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function AuthenticateUserController(
  request: Request,
  response: Response,
) {
  const authenticateUserSchemaBody = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = dataValidation(
    authenticateUserSchemaBody,
    request.body,
  )

  const authenticateUserUseCase: AuthenticateUserUseCase.UseCase =
    container.resolve('AuthenticateUserUseCase')

  const user = await authenticateUserUseCase.execute({ email, password })

  const authProviderJwt: AuthProviderJwt = container.resolve('AuthProviderJwt')

  const access_token = authProviderJwt.generateAuthKey(user.id, user.roles)

  response
    .status(200)
    .json([
      { message: `Usuário logado com sucesso! Seja bem vindo ${user.name}` },
      access_token,
    ])
}
