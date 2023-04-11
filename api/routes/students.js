import { Router } from 'express'
import { getStudents, studentDetail } from '../controllers/students.js'

const route = Router()

route.get('/students', getStudents)
route.get('/students/:id', studentDetail)

export default route
