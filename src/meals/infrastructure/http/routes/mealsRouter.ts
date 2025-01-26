import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import Router from 'express'
import { CreateMealsController } from '../controller/create-meals.controller'
import { GetMealsController } from '../controller/get-meals.controller'
import { UpdateMealsController } from '../controller/update-meals.controller'
import { DeleteMealsController } from '../controller/delete-meals.controller'

const mealsRouter = Router()

mealsRouter.post('/', isAuth, hasRole(['admin']), CreateMealsController)
mealsRouter.get('/:id', isAuth, hasRole(['admin', 'user']), GetMealsController)
mealsRouter.put(
  '/:id',
  isAuth,
  hasRole(['admin', 'user']),
  UpdateMealsController,
)
mealsRouter.delete(
  '/:id',
  isAuth,
  hasRole(['admin', 'user']),
  DeleteMealsController,
)

export { mealsRouter }
