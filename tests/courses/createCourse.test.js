import sinon from 'sinon'
import { Course } from '../../api/models/Courses'
import { createCourse } from '../../api/controllers/courses'

describe('createCourse', () => {
  afterEach(() => sinon.restore());

  it('should create a new course', async () => {
    const req = {
      body: {
        course_name: 'Test Course',
        course_description: 'A test course',
        start_date: new Date(),
        end_date: new Date(),
        teacher: 'Test Teacher',
      },
    };
    const res = {
      sendStatus: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const createStub = sinon.stub(Course, 'create').resolves();
    await createCourse(req, res);

    sinon.assert.calledOnce(createStub);
    sinon.assert.calledWith(createStub, req.body);
    sinon.assert.calledOnce(res.sendStatus);
    sinon.assert.calledWith(res.sendStatus, 201);
    sinon.assert.notCalled(res.json);
    sinon.assert.notCalled(res.status);
  });

  it('should return 500 if there is a server error', async () => {
    const req = {
      body: {},
    };
    const res = {
      sendStatus: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    const createStub = sinon.stub(Course, 'create').rejects(new Error('Server error'));
    await createCourse(req, res);

    sinon.assert.calledOnce(createStub);
    sinon.assert.calledWith(createStub, req.body);
    sinon.assert.notCalled(res.sendStatus);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { error: 'Server error' });
  });
});