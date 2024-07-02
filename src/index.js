import express from 'express'
import { query, body, validationResult, matchedData, checkSchema } from 'express-validator'
import { createUserValidationsSchema } from './utils/validationSchema.mjs'
import usersRouter from './routes/users.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cookieParser('idc4K'))
app.use(usersRouter)


app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})