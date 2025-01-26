import '@/users/infrastructure/container/'
import '@/suppliers/infrastructure/container/'
import '@/foods/infrastructure/container/'
import '@/meals/infrastructure/container/'
import '@/foodsPerMeals/infrastructure/container/'

import { container } from 'tsyringe'
import { BcryptjsHashProvider } from '../providers/hashProvider/bcryptjs-hash-provider'
import { AuthProviderJwt } from '../providers/auth-provider/auth-provider.jwt'

container.registerSingleton('BcryptjsHashProvider', BcryptjsHashProvider)
container.registerSingleton('AuthProviderJwt', AuthProviderJwt)
