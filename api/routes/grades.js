import { Router } from 'express'
import { getGrades } from '../controllers/grades.js'

const route = Router()

route.get('/grades', getGrades)
export default route
