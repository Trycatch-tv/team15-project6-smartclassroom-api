import { Course } from '../models/Courses.js'
import { Registration } from '../models/Registrations.js'
import { Student } from '../models/Students.js'

export const createRegistration = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { registration_date, cancellation_date, student_id, course_id } = req.body

    const student = await Student.findByPk(student_id)
    const course = await Course.findByPk(course_id)

    if (!student || !course) {
      res.sendStatus(404)
      return
    }

    // eslint-disable-next-line camelcase
    const registration = await Registration.create({ registration_date, cancellation_date })
    await registration.setStudent(student)
    await registration.setCourse(course)

    res.sendStatus(201)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const deleteRegistration = async (req, res) => {
  try {
    const registrationId = req.params.id

    const registration = await Registration.findByPk(registrationId)

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
