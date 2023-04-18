import { Router } from 'express'
import { createRegistration, deleteRegistration } from '../controllers/registrations.js'

const route = Router()

/**
 * @openapi
 * '/api/registrations':
 *  post:
 *     tags:
 *     - Registration
 *     summary: Asocia un estudiante a una clase
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - student_id
 *              - course_id
 *            properties:
 *              student_id:
 *                type: integer
 *                description: Identificador del estudiante
 *                example: 1
 *              course_id:
 *                type: integer
 *                description: Identificador de una clase
 *                example: 1
 *     responses:
 *      200:
 *        description: Asignado
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.post('/registrations', createRegistration)

/**
 * @openapi
 * '/api/registrations':
 *  delete:
 *     tags:
 *     - Registration
 *     summary: Elimina una asociación un estudiante a una clase
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - student_id
 *              - course_id
 *            properties:
 *              student_id:
 *                type: integer
 *                description: Identificador del estudiante
 *                example: 1
 *              course_id:
 *                type: integer
 *                description: Identificador de una clase
 *                example: 1
 *     responses:
 *      '200':
 *        description: Elemento eliminado
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.delete('/registrations', deleteRegistration)

export default route
