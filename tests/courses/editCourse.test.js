import sinon from 'sinon'
import { Course } from '../../api/models/Courses'
import { putCourse } from '../../api/controllers/courses'

describe('putCourse', () => {
    afterEach(() => {
      sinon.restore();
    });
  
    it('should update a course when given a valid course id', async () => {
      const fakeCourse = {
        course_id: 1,
        course_name: 'fake course',
        course_description: 'fake course description',
        start_date: new Date(),
        end_date: new Date(),
        teacher: 'fake teacher'
      };
  
      const courseSaveStub = sinon.stub().resolves(fakeCourse);
      sinon.stub(Course, 'findByPk').resolves(fakeCourse);
      fakeCourse.save = courseSaveStub;
  
      const req = { params: { id: 1 }, body: fakeCourse };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
  
      await putCourse(req, res);
      sinon.assert.calledOnce(Course.findByPk);
      sinon.assert.calledOnce(courseSaveStub);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, fakeCourse);
    });
  
    it('should return a 404 when given an invalid course id', async () => {
      sinon.stub(Course, 'findByPk').resolves(null);
  
      const req = { params: { id: 1 }, body: {} };
      const res = { sendStatus: sinon.spy() };
  
      await putCourse(req, res);
  
      sinon.assert.calledOnce(Course.findByPk);
      sinon.assert.calledOnce(res.sendStatus);
      sinon.assert.calledWith(res.sendStatus, 404);
    });
  
    it('should return a 500 error when an error occurs', async () => {
      const error = new Error('fake error');
      sinon.stub(Course, 'findByPk').rejects(error);
  
      const req = { params: { id: 1 }, body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
  
      await putCourse(req, res);
  
      sinon.assert.calledOnce(Course.findByPk);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { error: error.message });
    });
  });