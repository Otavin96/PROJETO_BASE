import '@/users/infrastructure/container/'
import '@/suppliers/infrastructure/container/'
import '@/foods/infrastructure/container/'
import '@/meals/infrastructure/container/'
import '@/foodsPerMeals/infrastructure/container/'
import '@/foodWastes/infrastructure/container/'

import { container } from 'tsyringe'
import { BcryptjsHashProvider } from '../providers/hashProvider/bcryptjs-hash-provider'
import { AuthProviderJwt } from '../providers/auth-provider/auth-provider.jwt'
import { PdfMakerCreateProvider } from '../providers/pdf-provider/pdfmaker-create-provider'

container.registerSingleton('BcryptjsHashProvider', BcryptjsHashProvider)
container.registerSingleton('AuthProviderJwt', AuthProviderJwt)
container.registerSingleton('PdfMakerCreateProvider', PdfMakerCreateProvider)
