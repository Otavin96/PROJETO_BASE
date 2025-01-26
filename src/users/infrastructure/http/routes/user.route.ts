import { Router } from 'express'
import { CreateUserController } from '../controllers/create-user.controller'
import { GetUserController } from '../controllers/get-user.controller'
import { DeleteUserController } from '../controllers/delete-user.controller'
import { UpdateUserController } from '../controllers/update-user.controller'
import { AuthenticateUserController } from '../controllers/authenticate-user.controller'
import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'

const usersRouter = Router()

usersRouter.post('/', CreateUserController)
usersRouter.get('/:id', isAuth, hasRole(['admin', 'user']), GetUserController)
usersRouter.delete('/:id', isAuth, hasRole(['admin']), DeleteUserController)
usersRouter.put('/:id', hasRole(['admin', 'user']), UpdateUserController)
usersRouter.post('/authenticate/', AuthenticateUserController)

export { usersRouter }
