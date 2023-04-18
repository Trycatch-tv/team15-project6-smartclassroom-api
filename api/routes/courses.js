import { Router } from 'express'
import { courseDetail, createCourse, deleteCourse, getCourses, putCourse, getCount } from '../controllers/courses.js'

const route = Router()
/**
 * @openapi
 * '/api/courses':
 *  post:
 *     tags:
 *     - Courses
 *     summary: Crea un nuevo curso en el sistema
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - course_name
 *              - course_description
 *              - start_date
 *              - end_date
 *              - teacher
 *            properties:
 *              course_name:
 *                type: string
 *                description: nombre del curso
 *                example: "Clase de Ingenieria"
 *              course_description:
 *                type: string
 *                description: descripcion o resumen de la clase
 *                example: "la tematica de la clase sera..."
 *              start_date:
 *                type: string
 *                format: date-time
 *                example: "2021-01-30T08:30:00Z"
 *                description: fecha de inicio del curso
 *              end_date:
 *                type: string
 *                format: date-time
 *                example: "2021-01-30T08:30:00Z"
 *                description: fecha de finalizacion del curso
 *              teacher:
 *                type: string
 *                description: nombre del profes(@)
 *                example: Maria Lopez
 *     responses:
 *      200:
 *        description: Creado
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.post('/courses', createCourse)

/**
 * @openapi
 * '/api/courses/getCount':
 *  get:
 *     tags:
 *     - Courses
 *     summary: Obtiene la cantidad de elementos activos del sistema
 *     responses:
 *      '200':
 *        description: Objeto con la informacion de la cantidad
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                coursesCount:
 *                  type: integer
 *                  format: int64
 *                  example: 4
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/courses/getCount', getCount)

/**
 * @openapi
 * '/api/courses/{id}':
 *  get:
 *     tags:
 *     - Courses
 *     summary: Obtiene la informacion de un curso segun su identificador
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identificador del curso
 *         schema:
 *           type: integer
 *           format: int64
 *           minimum: 1
 *     responses:
 *      '200':
 *        description: Objeto con la informacion del curso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                course_id:
 *                  type: integer
 *                  description: Id del curso
 *                  example: 1
 *                course_name:
 *                  type: string
 *                  description: Nombre del curso
 *                  example: "Clase de Ingenieria"
 *                course_description:
 *                  type: string
 *                  description: descripcion o resumen de la clase
 *                  example: "la tematica de la clase sera..."
 *                start_date:
 *                  type: string
 *                  format: date-time
 *                  example: "2021-01-30T08:30:00Z"
 *                  description: fecha de inicio del curso
 *                end_date:
 *                  type: string
 *                  format: date-time
 *                  example: "2021-01-30T08:30:00Z"
 *                  description: fecha de finalizacion del curso
 *                teacher:
 *                  type: string
 *                  description: nombre del profes(@)
 *                  example: Maria Lopez
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/courses/:id', courseDetail)

/**
 * @openapi
 * '/api/courses':
 *  get:
 *     tags:
 *     - Courses
 *     summary: Obtiene la lista de cursos
 *     responses:
 *      '200':
 *        description: Objeto con la informacion de la cantidad
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
 *                    description: Nombre del curso
 *                    example: "Clase de Ingenieria"
 *                  description:
 *                    type: string
 *                    description: descripcion o resumen de la clase
 *                    example: "la tematica de la clase sera..."
 *                  startDate:
 *                    type: string
 *                    format: date-time
 *                    example: "2021-01-30T08:30:00Z"
 *                    description: fecha de inicio del curso
 *                  endDate:
 *                    type: string
 *                    format: date-time
 *                    example: "2021-01-30T08:30:00Z"
 *                    description: fecha de finalizacion del curso
 *                  teacher:
 *                    type: string
 *                    description: nombre del profes(@)
 *                    example: Maria Lopez
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/courses', getCourses)

/**
 * @openapi
 * '/api/courses/{id}':
 *  delete:
 *     tags:
 *     - Courses
 *     summary: Elimina un elemento de la base de datos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identificador del curso
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
route.delete('/courses/:id', deleteCourse)

/**
 * @openapi
 * '/api/courses/{id}':
 *  put:
 *     tags:
 *     - Courses
 *     summary: Actualiza la informacion de un curso
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identificador del curso
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
 *              - course_name
 *              - course_description
 *              - start_date
 *              - end_date
 *              - teacher
 *            properties:
 *              course_name:
 *                type: string
 *                description: nombre del curso
 *                example: "Clase de Ingenieria"
 *              course_description:
 *                type: string
 *                description: descripcion o resumen de la clase
 *                example: "la tematica de la clase sera..."
 *              start_date:
 *                type: string
 *                format: date-time
 *                example: "2021-01-30T08:30:00Z"
 *                description: fecha de inicio del curso
 *              end_date:
 *                type: string
 *                format: date-time
 *                example: "2021-01-30T08:30:00Z"
 *                description: fecha de finalizacion del curso
 *              teacher:
 *                type: string
 *                description: nombre del profes(@)
 *                example: Maria Lopez
 *     responses:
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.put('/courses/:id', putCourse)

export default route
