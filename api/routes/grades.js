import { Router } from 'express'
import { getGradesByCourse, getGradesByStudent } from '../controllers/grades.js'

const route = Router()

route.get('/grades/courses/:id', getGradesByCourse)
route.get('/grades/students/:id', getGradesByStudent)
export default route
