import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { Router } from 'express'
import { CreateFoodsPerMealsController } from '../controller/create-foodsPerMeals.controller'
import { GetFoodsPerMealsController } from '../controller/get-foodsPerMeals.controller'
import { UpdateFoodsPerMealsController } from '../controller/update-foodsPerMeals.controller'
import { DeleteFoodsPerMealsController } from '../controller/delete-foodsPerMeals.controller'

const foodsPerMealsRouter = Router()

foodsPerMealsRouter.post(
  '/',
  isAuth,
  hasRole(['admin']),
  CreateFoodsPerMealsController,
)
foodsPerMealsRouter.get(
  '/:id',
  isAuth,
  hasRole(['admin']),
  GetFoodsPerMealsController,
)
foodsPerMealsRouter.put(
  '/:id',
  isAuth,
  hasRole(['admin']),
  UpdateFoodsPerMealsController,
)
foodsPerMealsRouter.delete(
  '/:id',
  isAuth,
  hasRole(['admin']),
  DeleteFoodsPerMealsController,
)

export { foodsPerMealsRouter }
