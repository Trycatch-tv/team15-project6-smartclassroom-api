/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { createRegistration } from '../../api/controllers/registrations'
import { Course } from '../../api/models/Courses'
import { Registration } from '../../api/models/Registrations'
import { Student } from '../../api/models/Students'
import sinon from 'sinon'

describe('createRegistration', () => {
  it('should create a new registration', async () => {
    const req = {
      body: {
        student_id: 1,
        course_id: 1
      }
    }
    const res = {
      sendStatus: sinon.spy()
    }
    const student = {
      id: 1
    }
    const course = {
      id: 1
    }
    const registration = {
      setStudent: sinon.spy(),
      setCourse: sinon.spy()
    }
    sinon.stub(Student, 'findByPk').resolves(student)
    sinon.stub(Course, 'findByPk').resolves(course)
    sinon.stub(Registration, 'create').resolves(registration)

    await createRegistration(req, res)

    sinon.assert.calledWith(Student.findByPk, 1)
    sinon.assert.calledWith(Course.findByPk, 1)
    sinon.assert.calledWith(Registration.create, {
      student_id: 1,
      course_id: 1,
      registration_date: sinon.match.date,
      cancellation_date: null
    })
    sinon.assert.calledOnce(registration.setStudent)
    sinon.assert.calledWith(registration.setStudent, student)
    sinon.assert.calledOnce(registration.setCourse)
    sinon.assert.calledWith(registration.setCourse, course)
    sinon.assert.calledWith(res.sendStatus, 201)
  })

  it('should return a 404 if the student does not exist', async () => {
    const req = {
      body: {
        student_id: 1,
        course_id: 1
      }
    }
    const res = {
      sendStatus: sinon.spy()
    }

    // Here we're cleaning stubs before use news stubs
    sinon.restore()

    const findByPkStub = sinon.stub(Student, 'findByPk').resolves(null)

    await createRegistration(req, res)

    sinon.assert.calledWith(findByPkStub, 1)
    sinon.assert.calledWith(res.sendStatus, 404)
  })
})
