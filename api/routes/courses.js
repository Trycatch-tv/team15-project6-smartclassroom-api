import { Router } from 'express'
import { courseDetail, createCourse, deleteCourse, getCourses, putCourse, getCount } from '../controllers/courses.js'

const route = Router()

route.post('/courses', createCourse)
route.get('/courses/getCount', getCount)
route.get('/courses/:id', courseDetail)
route.get('/courses', getCourses)
route.delete('/courses/:id', deleteCourse)
route.put('/courses/:id', putCourse)

export default route
