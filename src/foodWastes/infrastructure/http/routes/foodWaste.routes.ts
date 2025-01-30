import { Router } from 'express'
import { CreateFoodWastesController } from '../controller/create-foodWastes.controller'
import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { GetFoodWastesController } from '../controller/get-foodWastes.controller'
import { UpdateFoodWastesController } from '../controller/update-foodWastes.controller'
import { DeleteFoodWastesController } from '../controller/delete-foodWastes.controller'

const foodWasteRoutes = Router()

foodWasteRoutes.post(
  '/',
  isAuth,
  hasRole(['admin']),
  CreateFoodWastesController,
)

foodWasteRoutes.get('/:id', isAuth, hasRole(['admin']), GetFoodWastesController)
foodWasteRoutes.put(
  '/:id',
  isAuth,
  hasRole(['admin']),
  UpdateFoodWastesController,
)
foodWasteRoutes.delete(
  '/:id',
  isAuth,
  hasRole(['admin']),
  DeleteFoodWastesController,
)

export { foodWasteRoutes }
