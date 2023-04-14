import { Router } from 'express'
import { createRegistration, deleteRegistration } from '../controllers/registrations.js'

const route = Router()

route.post('/registrations', createRegistration)
route.delete('/registrations', deleteRegistration)

export default route
