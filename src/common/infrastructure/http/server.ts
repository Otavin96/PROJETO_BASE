import 'reflect-metadata'
import { app } from './app'
import { env } from '../env/'
import { dataSource } from '../typeorm'
import '@/common/infrastructure/container'

dataSource
  .initialize()
  .then(async () => {
    app.listen(env.PORT | 3333, () => {
      console.log(`Server is running on port ${env.PORT}`)
    })
  })
  .catch((error) => console.error('Error inicializing data source', error))
