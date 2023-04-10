import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') config()

const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PWD = process.env.DB_PWD
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST

const env = { PORT, DB_USER, DB_PWD, DB_NAME, DB_HOST }

export default env
