import { getCount } from '../../api/controllers/courses'
import { Course } from '../../api/models/Courses'
import sinon from 'sinon'

describe('getCount', () => {
  afterEach(() => {
    sinon.restore()
  });

  it('should return a count of courses', async () => {
    const courseCount = 10
    sinon.stub(Course, 'count').resolves(courseCount)

    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      }
    const req = {}

    await getCount(req, res)

    sinon.assert.calledOnce(Course.count)
    sinon.assert.calledOnce(res.status)
    sinon.assert.calledWith(res.status, 200)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { coursesCount: courseCount })
  })

  it('should return a 500 error if an error occurs', async () => {
    const errorMessage = 'Error occurred'
    sinon.stub(Course, 'count').throws(new Error(errorMessage));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getCount(req, res);

    sinon.assert.calledOnce(Course.count)
    sinon.assert.calledOnce(res.status)
    sinon.assert.calledWith(res.status, 500)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { error: errorMessage })
  })
})
