/* eslint-disable camelcase */
import { Course } from '../models/Courses.js'
import { Registration } from '../models/Registrations.js'
import { Student } from '../models/Students.js'

export const createRegistration = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { student_id, course_id } = req.body

    const student = await Student.findByPk(student_id)
    if (!student) {
      res.sendStatus(404)
      return
    }
    const course = await Course.findByPk(course_id)

    // eslint-disable-next-line camelcase
    const { registration_date, cancellation_date } = req.body

    const registration = await Registration.create({
      // eslint-disable-next-line camelcase
      registration_date: registration_date || null,
      cancellation_date: cancellation_date || null
    })
    await registration.setStudent(student)
    await registration.setCourse(course)

    res.sendStatus(201)
  } catch (err) {
    res.status(500).json(err)
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
