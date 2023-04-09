import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') config()

const PORT = process.env.PORT
const USER = process.env.USER
const PWD = process.env.PWD
const DB = process.env.DB

const env = { PORT, USER, PWD, DB }

export default env
