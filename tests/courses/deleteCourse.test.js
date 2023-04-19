import sinon from 'sinon'
import { Course } from '../../api/models/Courses'
import { Grade } from '../../api/models/Grades'
import { Registration } from '../../api/models/Registrations'
import { deleteCourse } from '../../api/controllers/courses'

describe('deleteCourse', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should delete course and return status 200', async () => {
    const courseId = 1;
    sinon.stub(Course, 'findByPk').resolves({});
    sinon.stub(Grade, 'destroy').resolves(1);
    sinon.stub(Registration, 'destroy').resolves(1);
    sinon.stub(Course, 'destroy').resolves(1);

    const req = { params: { id: courseId } };
    const res = {
      sendStatus: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await deleteCourse(req, res);

    sinon.assert.calledOnce(Course.findByPk);
    sinon.assert.calledOnce(Grade.destroy);
    sinon.assert.calledOnce(Registration.destroy);
    sinon.assert.calledOnce(Course.destroy);
    sinon.assert.calledOnce(res.sendStatus);
    sinon.assert.calledWith(res.sendStatus, 200);
  });

  it('should return 404 if course is not found', async () => {
    const courseId = 1;
    sinon.stub(Course, 'findByPk').resolves(null);
    sinon.stub(Grade, 'destroy').resolves(null);
    sinon.stub(Registration, 'destroy').resolves(null);
    sinon.stub(Course, 'destroy').resolves(null);

    const req = { params: { id: courseId } };
    const res = {
      sendStatus: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await deleteCourse(req, res);

    sinon.assert.calledOnce(Course.findByPk);
    sinon.assert.notCalled(Grade.destroy);
    sinon.assert.notCalled(Registration.destroy);
    sinon.assert.notCalled(Course.destroy);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { error: 'Course not found' });
  });

  it('should return 500 if there is an error', async () => {
    const courseId = 1;
    sinon.stub(Course, 'findByPk').throws(new Error('Some error'));
    sinon.stub(Grade, 'destroy').resolves(null);
    sinon.stub(Registration, 'destroy').resolves(null);
    sinon.stub(Course, 'destroy').resolves(null);

    const req = { params: { id: courseId } };
    const res = {
      sendStatus: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await deleteCourse(req, res);

    sinon.assert.calledOnce(Course.findByPk);
    sinon.assert.notCalled(Grade.destroy);
    sinon.assert.notCalled(Registration.destroy);
    sinon.assert.notCalled(Course.destroy);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { error: 'Some error' });
  });
});