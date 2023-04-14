import { Router } from 'express'
import { createRegistration, deleteRegistration } from '../controllers/registrations.js'

const route = Router()

route.post('/registrations', createRegistration)
route.delete('/registrations/:id', deleteRegistration)

export default route
