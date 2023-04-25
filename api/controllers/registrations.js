/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import { Course } from '../models/Courses.js'
import { Registration } from '../models/Registrations.js'
import { Student } from '../models/Students.js'

export const createRegistration = async (req, res) => {
  try {
    const { student_id, course_id, registration_date, cancellation_date } = req.body

    const student = await Student.findByPk(student_id)
    if (!student) {
      res.sendStatus(404)
      return
    }

    const course = await Course.findByPk(course_id)

    const existRegistration = await Registration.findOne({
      where: {
        student_id,
        course_id,
        registration_date,
        cancellation_date
      }
    })

    if (existRegistration) {
      res.sendStatus(409)
      return
    }

    const registration = await Registration.create({
      student_id,
      course_id,
      registration_date: registration_date,
      cancellation_date: cancellation_date
    })

    await registration.setStudent(student)
    await registration.setCourse(course)

    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'error creating' })
  }
}

export const deleteRegistration = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { student_id, course_id } = req.body

    const registration = await Registration.findOne({
      // eslint-disable-next-line camelcase
      where: { student_id, course_id }
    })

    if (!registration) {
      res.sendStatus(404)
      return
    }

    await registration.destroy()
    res.sendStatus(204)
  } catch (err) {
    res.status(500).json(err)
  }
}
