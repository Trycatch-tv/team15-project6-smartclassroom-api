import { Router } from 'express'
import { getGradesByCourse, getGradesByStudent } from '../controllers/grades.js'

const route = Router()

route.get('/grades/course/:id', getGradesByCourse)
route.get('/grades/student/:id', getGradesByStudent)
export default route
