import {
  AuthProvider,
  GenerateAuthKeyProps,
  VerifyAuthKeyProps,
} from '@/common/domain/providers/auth-provider'
import { StatusPermission } from '@/users/domain/models/users.model'
import jwt from 'jsonwebtoken'
import { env } from '../../env'
import { InvalidCredentialsError } from '@/common/domain/errors/invalid-credentials-error'

type DecodedTokenProps = {
  sub: string
  roles: StatusPermission
}

export class AuthProviderJwt implements AuthProvider {
  generateAuthKey(
    user_id: string,
    roles: StatusPermission,
  ): GenerateAuthKeyProps {
    const access_token = jwt.sign({ roles }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
      subject: user_id,
    })

    return { access_token }
  }
  verifyAuthKey(token: string): VerifyAuthKeyProps {
    try {
      const decodedToken = jwt.verify(token, env.JWT_SECRET)

      const { sub, roles } = decodedToken as DecodedTokenProps
      return { user_id: sub, roles }
    } catch {
      throw new InvalidCredentialsError('Invalid credeentials')
    }
  }
}
