import { isAuth } from '@/common/infrastructure/http/middlewares/isAuth'
import { Router } from 'express'
import { CreateSuppliersController } from '../controller/create-suppliers.controller'
import { hasRole } from '@/common/infrastructure/http/middlewares/hasRoles'
import { DeleteSuppliersController } from '../controller/delete-suppliers.controller'

const suppliersRouter = Router()

suppliersRouter.post('/', isAuth, hasRole(['admin']), CreateSuppliersController)
suppliersRouter.delete(
  '/:id',
  isAuth,
  hasRole(['admin']),
  DeleteSuppliersController,
)

export { suppliersRouter }
