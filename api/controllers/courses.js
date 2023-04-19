/* eslint-disable camelcase */
import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'

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
    res.status(500).json(err)
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
    res.status(500).json(err)
  }
}

describe('putCourse', () => {
  it('should update a course when given a valid course id', async () => {
    const fakeCourse = {
      course_id: 1,
      course_name: 'fake course',
      course_description: 'fake course description',
      start_date: new Date(),
      end_date: new Date(),
      teacher: 'fake teacher'
    }

    const courseSaveStub = sinon.stub().resolves(fakeCourse)
    const findByPkStub = sinon.stub(Course, 'findByPk').resolves({
      ...fakeCourse,
      save: courseSaveStub
    })
    const req = { params: { id: 1 }, body: fakeCourse }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: sinon.spy()
    }

    await putCourse(req, res)

    sinon.assert.calledWith(findByPkStub, 1)
    sinon.assert.calledOnce(courseSaveStub)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, fakeCourse)

    findByPkStub.restore()
  })

  it('should return a 404 when given an invalid course id', async () => {
    const findByPkStub = sinon.stub(Course, 'findByPk').resolves(null)
    const req = { params: { id: 1 }, body: {} }
    const res = { sendStatus: sinon.spy() }

    await putCourse(req, res)

    sinon.assert.calledWith(findByPkStub, 1)
    sinon.assert.calledWith(res.sendStatus, 404)

    findByPkStub.restore()
  })

  it('should return a 500 error when an error occurs', async () => {
    const findByPkStub = sinon.stub(Course, 'findByPk').rejects(new Error('fake error'))
    const req = { params: { id: 1 }, body: {} }
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }

    await putCourse(req, res)

    sinon.assert.calledWith(findByPkStub, 1)
    sinon.assert.calledWith(res.status, 500)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { message: 'fake error' })

    findByPkStub.restore()
  })
})

