import { Router } from 'express'
import { courseDetail } from '../controllers/course.js'

const route = Router()

route.get('/course/:id', courseDetail)

export default route
