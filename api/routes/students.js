import { Router } from 'express'
import { getStudents, studentDetail, deleteStudent } from '../controllers/students.js'

const route = Router()

route.get('/students', getStudents)
route.get('/students/:id', studentDetail)
route.delete('/students/:id', deleteStudent)

export default route