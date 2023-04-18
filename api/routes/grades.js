import { Router } from 'express'
import { getGradesByCourse, getGradesByStudent } from '../controllers/grades.js'

const route = Router()

/**
 * @openapi
 * 'api/grades/courses/{id}':
 *  get:
 *     tags:
 *     - Grades
 *     summary: Obtiene las notas por curso
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
 *        description: Objeto con la informacion de las califiaciones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  studentId:
 *                    type: integer
 *                    format: int32
 *                    example: 1
 *                  studentName:
 *                    type: string
 *                    example: Camila Lara
 *                  grade1:
 *                    type: integer
 *                    format: int32
 *                    example: 10
 *                  grade2:
 *                    type: integer
 *                    format: int32
 *                    example: 10
 *                  grade3:
 *                    type: integer
 *                    format: int32
 *                    example: 8
 *                  grade4:
 *                    type: integer
 *                    format: int32
 *                    example: 9
 *                  grade5:
 *                    type: integer
 *                    format: int32
 *                    example: 0
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/grades/courses/:id', getGradesByCourse)

/**
 * @openapi
 * 'api/grades/students/{id}':
 *  get:
 *     tags:
 *     - Grades
 *     summary: Obtiene las notas por alumno
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: identificador del estudiante
 *         schema:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *     responses:
 *      '200':
 *        description: Objeto con la informacion de las califiaciones
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  courseId:
 *                    type: integer
 *                    format: int32
 *                    example: 4
 *                  courseName:
 *                    type: string
 *                    example: Ingenieria
 *                  grade1:
 *                    type: integer
 *                    format: int32
 *                    example: 10
 *                  grade2:
 *                    type: integer
 *                    format: int32
 *                    example: 10
 *                  grade3:
 *                    type: integer
 *                    format: int32
 *                    example: 8
 *                  grade4:
 *                    type: integer
 *                    format: int32
 *                    example: 9
 *                  grade5:
 *                    type: integer
 *                    format: int32
 *                    example: 0
 *      404:
 *        description: Not Found
 *      500:
 *        description: unhandled exception
 */
route.get('/grades/students/:id', getGradesByStudent)
export default route
