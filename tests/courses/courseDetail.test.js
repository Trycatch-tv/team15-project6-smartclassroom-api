import sinon from 'sinon'
import { Course } from '../../api/models/Courses'
import { courseDetail, createCourse } from '../../api/controllers/courses'

describe('courseDetail', () => {
  it('should return a course object when given a valid course id', async () => {
    const fakeCourse = {
      course_id: 1,
      course_name: 'fake course',
      course_description: 'fake course description',
      start_date: new Date(),
      end_date: new Date(),
      teacher: 'fake teacher'
    }

    const findByPkStub = sinon.stub(Course, 'findByPk').resolves(fakeCourse)
    const res = {
      status: jest.fn().mockReturnThis(),
      json: sinon.spy()
    }
    const req = { params: { id: 1 } }

    await courseDetail(req, res)

    sinon.assert.calledWith(findByPkStub, 1)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, fakeCourse)

    findByPkStub.restore()
  })

  it('should return a 404 error when given an invalid course id', async () => {
    const findByPkStub = sinon.stub(Course, 'findByPk').resolves(null)
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }
    const req = { params: { id: 2 } }

    await courseDetail(req, res)

    sinon.assert.calledWith(findByPkStub, 2)
    sinon.assert.calledOnce(res.status)
    sinon.assert.calledWith(res.status, 404)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { error: 'Course not found' })

    findByPkStub.restore()
  })

  it('should return a 500 error when an error occurs', async () => {
    const findByPkStub = sinon.stub(Course, 'findByPk').rejects(new Error('fake error'))
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }
    const req = { params: { id: 3 } }

    await courseDetail(req, res)

    sinon.assert.calledWith(findByPkStub, 3)
    sinon.assert.calledWith(res.status, 500)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { error: 'fake error' })

    findByPkStub.restore()
  })
})
describe('create course', () => {
  it('should return a 201 status when given a object'), async () =>{
    const fakeCourse = {
      course_name: 'fake course',
      course_description: 'fake course description',
      start_date: new Date(),
      end_date: new Date(),
      teacher: 'fake teacher'
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: sinon.spy()
    }
    const req = { body: fakeCourse }

    await createCourse(req, res)
    sinon.assert.calledOnce(res.status)
    sinon.assert.calledWith(res.status, 201)
  }
  it('should return a 500 error when an error occurs', async () => {
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }
    const req = {}

    await createCourse(req, res)

    sinon.assert.calledWith(res.status, 500)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { error: 'fake error' })
  })
})
describe('get courses', () => {
  it('should return a  object when given a url'), async () =>{
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: sinon.spy()
    }

    await getCourse({},res)
    sinon.assert.calledOnce(res.status)
    sinon.assert.calledWith(res.status, 200)
    sinon.assert.calledOnce(res.json)

  }
  it('should return a 500 error when an error occurs', async () => {
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() }
    const req = {}

    await getCourse(req, res)

    sinon.assert.calledWith(res.status, 500)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { error: 'fake error' })
  })
})
describe('deleteCourse', () => {
  it('should delete a course and return status 200 when given a valid course id', async () => {
    const courseId = 1

    const destroyStub = sinon.stub(Course, 'destroy').resolves(1)
    const gradeDestroyStub = sinon.stub(Grade, 'destroy').resolves(1)
    const regDestroyStub = sinon.stub(Registration, 'destroy').resolves(1)
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    }
    const req = { params: { id: courseId } }

    await deleteCourse(req, res)

    sinon.assert.calledWith(destroyStub, { where: { course_id: courseId } })
    sinon.assert.calledWith(gradeDestroyStub, { where: { course_id: courseId } })
    sinon.assert.calledWith(regDestroyStub, { where: { course_id: courseId } })
    sinon.assert.calledWith(res.status, 200)
    sinon.assert.calledOnce(res.json)

    destroyStub.restore()
    gradeDestroyStub.restore()
    regDestroyStub.restore()
  })

  it('should return a 404 error when the course does not exist', async () => {
    const courseId = 1

    const destroyStub = sinon.stub(Course, 'destroy').resolves(0)
    const gradeDestroyStub = sinon.stub(Grade, 'destroy').resolves(0)
    const regDestroyStub = sinon.stub(Registration, 'destroy').resolves(0)
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    }
    const req = { params: { id: courseId } }

    await deleteCourse(req, res)

    sinon.assert.calledWith(destroyStub, { where: { course_id: courseId } })
    sinon.assert.calledWith(gradeDestroyStub, { where: { course_id: courseId } })
    sinon.assert.calledWith(regDestroyStub, { where: { course_id: courseId } })
    sinon.assert.calledWith(res.status, 404)
    sinon.assert.calledOnce(res.json)

    destroyStub.restore()
    gradeDestroyStub.restore()
    regDestroyStub.restore()
  })

  it('should return a 500 error when an error occurs', async () => {
    const courseId = 1

    const destroyStub = sinon.stub(Course, 'destroy').rejects('fake error')
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    }
    const req = { params: { id: courseId } }

    await deleteCourse(req, res)

    sinon.assert.calledWith(res.status, 500)
    sinon.assert.calledOnce(res.json)

    destroyStub.restore()
  })
})
