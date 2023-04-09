import { Router } from 'express'
import { courseDetail, createCourse } from '../controllers/courses.js'

const route = Router()

route.post('/courses', createCourse)
route.get('/courses/:id', courseDetail)

export default route
