import { app } from './app'
import { env } from '../env/'

app.listen(env.PORT | 3333, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
