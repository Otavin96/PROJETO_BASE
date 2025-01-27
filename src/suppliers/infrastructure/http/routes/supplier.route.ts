import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { Router } from 'express'
import { CreateSuppliersController } from '../controller/create-suppliers.controller'
import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { DeleteSuppliersController } from '../controller/delete-suppliers.controller'
import { UpdateSuppliersController } from '../controller/update-suppliers.controller'
import { GetSuppliersController } from '../controller/get-suppliers.controller'

const suppliersRouter = Router()

suppliersRouter.post('/', isAuth, hasRole(['admin']), CreateSuppliersController)
suppliersRouter.get('/:id', isAuth, hasRole(['admin']), GetSuppliersController)
suppliersRouter.delete(
  '/:id',
  isAuth,
  hasRole(['admin']),
  DeleteSuppliersController,
)
suppliersRouter.put(
  '/:id',
  isAuth,
  hasRole(['admin']),
  UpdateSuppliersController,
)

export { suppliersRouter }
