import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import env from './config.js'
import courseRoute from './routes/courses.js'
import studentRoute from './routes/students.js'
import gradesRoute from './routes/grades.js'
import registrationsRoute from './routes/registrations.js'
import swaggerDocs from './swagger.js'

// app init
const app = express()

// settings
app.set('port', env.PORT)

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
swaggerDocs(app)

// Routes
app.use('/api', courseRoute)
app.use('/api', studentRoute)
app.use('/api', gradesRoute)
app.use('/api', registrationsRoute)

// Route Not Found
app.use((req, res) => {
  res.status(404).json({
    error: 'Route Not Found'
  })
})

export default app
