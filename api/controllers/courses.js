/* eslint-disable camelcase */
import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'
import { Op, Sequelize } from 'sequelize'
import { Student } from '../models/Students.js'

export const courseDetail = async (req, res) => {
  try {
    const courseId = req.params.id
    const course = await Course.findByPk(courseId)

    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    return res.status(200).json(course)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const createCourse = async (req, res) => {
  try {
    await Course.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({ order: [['course_name', 'ASC']] })
    const courseList = courses.map(course => ({
      id: course.course_id,
      name: course.course_name,
      description: course.course_description,
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

    if(courseToDelete == null){
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
    });
    
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
    const { course_name, course_description, start_date, end_date, teacher } = req.body
    course.course_name = course_name
    course.course_description = course_description
    course.start_date = start_date
    course.end_date = end_date
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
    });

    const coursesList = coursesWithoutRegistration.map(course => ({
      courseId: course.course_id,
      courseName: course.course_name
    }))

    res.status(200).json(coursesList)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
