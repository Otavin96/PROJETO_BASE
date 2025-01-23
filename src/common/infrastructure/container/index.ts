import '@/users/infrastructure/container/'
import { container } from 'tsyringe'
import { BcryptjsHashProvider } from '../providers/hashProvider/bcryptjs-hash-provider'
import { AuthProviderJwt } from '../providers/auth-provider/auth-provider.jwt'

container.registerSingleton('BcryptjsHashProvider', BcryptjsHashProvider)
container.registerSingleton('AuthProviderJwt', AuthProviderJwt)
