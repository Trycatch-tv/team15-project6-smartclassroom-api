/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import { Course } from '../models/Courses.js'
import { Registration } from '../models/Registrations.js'
import { Student } from '../models/Students.js'
import { Grade } from '../models/Grades.js'

export const createRegistration = async (req, res) => {
  try {
    const { studentId, courseId } = req.body

    const student = await Student.findByPk(studentId)
    if (!student) {
      res.sendStatus(404)
      return
    }

    const course = await Course.findByPk(courseId)
    if (!course) {
      res.sendStatus(404)
      return
    }

    const count = await Registration.count({
      where: {
        student_id: studentId,
        course_id: courseId
      }
    })

    if (count > 0) {
      res.status(409).send({ error: 'Ya existe una inscripción para el estudiante y curso especificados' })
      return
    }

    const registrationDate = new Date()
    const registration = await Registration.create({
      student_id: studentId,
      course_id: courseId,
      registration_date: registrationDate.toISOString().slice(0, 10)
    })

    await registration.setStudent(student)
    await registration.setCourse(course)

    await Grade.create({ registration_id: registration.registration_id })

    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    console.log(err.message)
    res.status(500).json(err)
  }
}

export const deleteRegistration = async (req, res) => {
  try {
    const { studentId, courseId } = req.body

    const registration = await Registration.findOne({
      where: {
        student_id: studentId,
        course_id: courseId,
        cancellation_date: null
      }
    })

    if (!registration) {
      res.sendStatus(404)
      return
    }

    const cancelleationDate = new Date()
    registration.cancellation_date = cancelleationDate.toISOString().slice(0, 10)

    await registration.save()
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
