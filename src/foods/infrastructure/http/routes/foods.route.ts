import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { Router } from 'express'
import { CreateFoodsController } from '../controller/create-foods.controller'

const foodsRouter = Router()

foodsRouter.post('/', isAuth, hasRole(['admin']), CreateFoodsController)

export { foodsRouter }
