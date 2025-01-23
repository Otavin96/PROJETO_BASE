import { usersRouter } from '@/users/infrastructure/http/routes/user.route'
import { Router } from 'express'

const router = Router()

router.use('/users', usersRouter)

export { router }
