import { Router } from 'express'
import { courseDetail, createCourse, deleteCourse, getCourses } from '../controllers/courses.js'

const route = Router()

route.post('/courses', createCourse)
route.get('/courses/:id', courseDetail)
route.get('/courses', getCourses)
route.delete('/courses/:id', deleteCourse)
export default route
