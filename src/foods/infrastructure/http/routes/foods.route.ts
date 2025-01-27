import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { Router } from 'express'
import { CreateFoodsController } from '../controller/create-foods.controller'
import { GetFoodsController } from '../controller/get-foods.controller'
import { UpdateFoodsController } from '../controller/update-foods.controller'
import { DeleteFoodsController } from '../controller/delete-foods.controller'

const foodsRouter = Router()

foodsRouter.post('/', isAuth, hasRole(['admin']), CreateFoodsController)
foodsRouter.get('/:id', isAuth, hasRole(['admin']), GetFoodsController)
foodsRouter.put('/:id', isAuth, hasRole(['admin']), UpdateFoodsController)
foodsRouter.delete('/:id', isAuth, hasRole(['admin']), DeleteFoodsController)

export { foodsRouter }
