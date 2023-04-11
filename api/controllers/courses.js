import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'

export const courseDetail = async (req, res) => {
  const courseId = req.params.id

  try {
    const course = await Course.findByPk(courseId)

    if (!course) {
      return res.status(404).json({ error: 'Course not found' })
    }

    return res.status(200).json(course)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const createCourse = async (req, res) => {
  try {
    res.status(200).json({ message: 'create course' })
  } catch (err) {
    res.status(404).json(err)
  }
}
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll()
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
    console.log(err)
    res.status(500).json(err)
  }
}

export const deleteCourse = async (req, res) => {
  const courseId = req.params.id

  try {
    const courseGrade = await Grade.destroy({ where: { course_id: courseId } })
    const courseRegistration = await Registration.destroy({ where: { course_id: courseId } })
    const course = await Course.destroy({ where: { course_id: courseId } })

    if (!course && !courseRegistration && !courseGrade) {
      return res.status(404).json({ error: 'Course not found' })
    }

    return res.status(200).json(course, courseRegistration, courseGrade)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
