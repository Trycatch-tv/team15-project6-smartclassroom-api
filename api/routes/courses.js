import { Router } from 'express'
import { courseDetail, createCourse, getCourses } from '../controllers/courses.js'

const route = Router()

route.post('/courses', createCourse)
route.get('/courses/:id', courseDetail)
route.get('/courses', getCourses)
export default route
