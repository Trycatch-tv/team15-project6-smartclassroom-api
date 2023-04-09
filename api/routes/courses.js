import { Router } from 'express'
import { courseDetail, createCourse, deleteCourse, editCourseDetail } from '../controllers/courses.js'

const route = Router()

route.post('/courses', createCourse)
route.get('/courses/:id', courseDetail)

route.patch('/courses/:id', editCourseDetail)
route.delete('/courses/:id', deleteCourse)

export default route
