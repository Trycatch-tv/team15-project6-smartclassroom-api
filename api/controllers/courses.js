/* eslint-disable camelcase */
import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'
import { Op, Sequelize } from 'sequelize'
import { Student } from '../models/Students.js'
import Joi from 'joi'

export const courseDetail = async (req, res) => {
  try {
    const courseId = req.params.id
    const course = await Course.findByPk(courseId)

    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    return res.status(200).json({
      courseId: course.course_id,
      courseName: course.course_name,
      courseDescription: course.course_description,
      startDate: course.start_date,
      endDate: course.end_date,
      teacher: course.teacher
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const createCourse = async (req, res) => {
  try {
    const newCourse = req.body
    if (!validateCreateCourse(req.body)) return res.sendStatus(400)
    await Course.create({
      course_id: newCourse.courseId,
      course_name: newCourse.courseName,
      course_description: newCourse.courseDescription,
      start_date: newCourse.startDate,
      end_date: newCourse.endDate,
      teacher: newCourse.teacher
    })
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({ order: [['course_name', 'ASC']] })
    const courseList = courses.map(course => ({
      courseId: course.course_id,
      courseName: course.course_name,
      courseDescription: course.course_description,
      startDate: course.start_date,
      endDate: course.end_date,
      teacher: course.teacher
    }))

    res.status(200).json(courseList)
  } catch (err) {
    // Si ocurre algún error, enviamos una respuesta con un mensaje de error y un código de estado HTTP 500 (Error interno del servidor)
    res.status(500).json({ error: err.message })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id
    const courseToDelete = await Course.findByPk(courseId)

    if (courseToDelete == null) {
      return res.status(404).json({ error: 'Course not found' })
    }
    await Grade.destroy({
      where: {
        registration_id: {
          [Op.in]: Sequelize.literal(
            `(SELECT registration_id FROM registrations WHERE course_id = ${courseId})`
          )
        }
      }
    })
    await Registration.destroy({ where: { course_id: courseId } })
    await Course.destroy({ where: { course_id: courseId } })

    return res.sendStatus(200)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const putCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id)
    if (!course) {
      return res.sendStatus(404)
    }
    if (!validatePutCourse(req.body)) return res.sendStatus(400)
    const { courseName, courseDescription, startDate, endDate, teacher } = req.body
    course.course_name = courseName
    course.course_description = courseDescription
    course.start_date = startDate
    course.end_date = endDate
    course.teacher = teacher

    await course.save()
    res.status(200).json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCount = async (req, res) => {
  try {
    const count = await Course.count()
    res.status(200).json({ coursesCount: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCoursesNotEnrolled = async (req, res) => {
  try {
    const studentId = req.query.studentId
    const student = await Student.findByPk(studentId)
    if (!student) {
      return res.sendStatus(404)
    }

    const coursesWithoutRegistration = await Course.findAll({
      where: {
        course_id: {
          [Op.notIn]: Sequelize.literal(
            `(SELECT course_id FROM registrations WHERE student_id = ${studentId})`
          )
        }
      }
    })

    const coursesList = coursesWithoutRegistration.map(course => ({
      courseId: course.course_id,
      courseName: course.course_name
    }))

    res.status(200).json(coursesList)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
export const validateCreateCourse = (Course) => {
  const schema = Joi.object({
    course_name: Joi.string().max(80).trim().min(0).required(),
    course_description: Joi.string().max(255).trim().min(0).required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
    teacher: Joi.string().max(40).trim().min(0).required()
  })
  const { err } = schema.validate(Course)
  if (err) return false
}
export const validatePutCourse = (Course) => {
  const schema = Joi.object({
    course_name: Joi.string().max(80).trim().min(0),
    course_description: Joi.string().max(255).trim().min(0),
    start_date: Joi.date(),
    end_date: Joi.date().greater(Joi.ref('start_date')),
    teacher: Joi.string().max(40).trim().min(0)
  })
  const { err } = schema.validate(Course)
  if (err) return false
}
