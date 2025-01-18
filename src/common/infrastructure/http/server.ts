import express from 'express'
import cors from 'cors'
import { app } from './app'
import { env } from '../env/'

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' })
})

app.listen(env.PORT | 3333, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
