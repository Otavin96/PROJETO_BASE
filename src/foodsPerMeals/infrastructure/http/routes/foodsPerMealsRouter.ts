import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { Router } from 'express'
import { CreateFoodsPerMealsController } from '../controller/create-foodsPerMeals.controller'
import { GetFoodsPerMealsController } from '../controller/get-foodsPerMeals.controller'

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
  hasRole(['admin', 'user']),
  GetFoodsPerMealsController,
)

export { foodsPerMealsRouter }
