import { Router } from 'express'
import { getGrades } from '../controllers/grades'

const route = Router()

route.get('/grades/courses/:id', getGrades)
export default route
