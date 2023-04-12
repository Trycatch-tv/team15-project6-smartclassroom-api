import { Router } from 'express'
import { getGradesByCourse } from '../controllers/grades.js'

const route = Router()

route.get('/grades', getGradesByCourse)
export default route
