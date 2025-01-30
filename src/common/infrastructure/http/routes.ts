import { foodsRouter } from '@/foods/infrastructure/http/routes/foods.route'
import { foodsPerMealsRouter } from '@/foodsPerMeals/infrastructure/http/routes/foodsPerMealsRouter'
import { foodWasteRoutes } from '@/foodWastes/infrastructure/http/routes/foodWaste.routes'
import { mealsRouter } from '@/meals/infrastructure/http/routes/mealsRouter'
import { suppliersRouter } from '@/suppliers/infrastructure/http/routes/supplier.route'
import { usersRouter } from '@/users/infrastructure/http/routes/user.route'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ola Dev!' })
})

routes.use('/users', usersRouter)
routes.use('/suppliers', suppliersRouter)
routes.use('/foods', foodsRouter)
routes.use('/meals', mealsRouter)
routes.use('/foodsPerMeals', foodsPerMealsRouter)
routes.use('/foodWastes', foodWasteRoutes)

export { routes }
