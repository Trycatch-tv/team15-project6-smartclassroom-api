import sinon from 'sinon'
import { Course } from '../../api/models/Courses'
import { courseDetail } from '../../api/controllers/courses'

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
