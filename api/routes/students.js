import { Router } from 'express'
import { getStudents, studentDetail, deleteStudent, getCount, createStudent, putStudent, notEnrolledStudent } from '../controllers/students.js'

const route = Router()

/**
 * @openapi
 * '/api/students':
 *  post:
 *     tags:
 *     - Students
 *     summary: Crea un nuevo alumno en el sistema
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - student_name
 *              - email
 *              - phone
 *            properties:
 *              student_name:
 *                type: string
 *                description: Nombre del estudiante
 *                example: "Mariano Ribera"
 *              email:
 *                type: string
 *                description: email del alumno
 *                example: "email@dominio.com"
 *              phone:
 *                type: string
 *                example: "999-555-2222"
 *                description: numero de telefono del alumno
 *     responses:
 *      200:
 *        description: Creado
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.post('/students', createStudent)

/**
 * @openapi
 * '/api/students':
 *  get:
 *     tags:
 *     - Students
 *     summary: Obtiene la lista de estudiantes
 *     responses:
 *      '200':
 *        description: Objeto con la informacion los estudiantes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: Id del curso
 *                    example: 1
 *                  name:
 *                    type: string
 *                    description: Nombre del estudiante
 *                    example: "Mariano Ribera"
 *                  email:
 *                    type: string
 *                    description: email del alumno
 *                    example: "email@dominio.com"
 *                  phone:
 *                    type: string
 *                    example: "999-555-2222"
 *                    description: numero de telefono del alumno
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/students', getStudents)

/**
 * @openapi
 * '/api/students/getCount':
 *  get:
 *     tags:
 *     - Students
 *     summary: Obtiene la cantidad de elementos activos del sistema
 *     responses:
 *      '200':
 *        description: Objeto con la informacion de la cantidad
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                studentsCount:
 *                  type: integer
 *                  format: int64
 *                  example: 4
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/students/getCount', getCount)

/**
 * @openapi 
 * /api/courses/not-enrolled-students:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Devuelve la lista de estudiantes que no están matriculados en un curso específico.
 *     parameters:
 *       - name: courseId
 *         in: query
 *         required: true
 *         description: ID del curso del que se desea obtener la lista de estudiantes no matriculados.
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       '200':
 *         description: Lista de estudiantes no matriculados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del estudiante.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nombre del estudiante.
 *                     example: "John Doe"
 *        404:
 *         description: Not Found.
 *        500:
 *         description: unhandled exception.
 */
route.get('/students/getStudentsNotInCourse', notEnrolledStudent)

/**
 * @openapi
 * '/api/students/{id}':
 *  get:
 *     tags:
 *     - Students
 *     summary: Obtiene la informacion de un estudiante segun su identificador
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identificador del estudiante
 *         schema:
 *           type: integer
 *           format: int64
 *           minimum: 1
 *     responses:
 *      '200':
 *        description: Objeto con la informacion del estidiante
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: Id del estudiante
 *                  example: 1
 *                name:
 *                  type: string
 *                  description: Nombre del curso
 *                  example: "Leandro Ruiz"
 *                email:
 *                  type: string
 *                  description: email del alumno
 *                  example: "email@dominio.com"
 *                phone:
 *                  type: string
 *                  example: "999-555-2222"
 *                  description: numero de telefono del alumno
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/students/:id', studentDetail)

/**
 * @openapi
 * '/api/students/{id}':
 *  delete:
 *     tags:
 *     - Students
 *     summary: Elimina un elemento de la base de datos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identificador del estudiante
 *         schema:
 *           type: integer
 *           format: int64
 *           minimum: 1
 *     responses:
 *      '200':
 *        description: Elemento eliminado
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.delete('/students/:id', deleteStudent)

/**
 * @openapi
 * '/api/students/{id}':
 *  put:
 *     tags:
 *     - Students
 *     summary: Actualiza la informacion del estudiante
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identificador del estudiante
 *         schema:
 *           type: integer
 *           format: int64
 *           minimum: 1
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - student_name
 *              - email
 *              - phone
 *            properties:
 *              student_name:
 *                type: string
 *                description: Nombre del estudiante
 *                example: "Mariano Ribera"
 *              email:
 *                type: string
 *                description: email del alumno
 *                example: "email@dominio.com"
 *              phone:
 *                type: string
 *                example: "999-555-2222"
 *                description: numero de telefono del alumno
 *     responses:
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.put('/students/:id', putStudent)

export default route
