import sinon from 'sinon'
import { Course } from '../../api/models/Courses'
import { getCourses } from '../../api/controllers/courses'

describe('getCourses', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  it('should return a list of courses', async () => {
    const courses = [
      {
        course_id: 1,
        course_name: 'Course 1',
        course_description: 'Description 1',
        start_date: '2022-01-01',
        end_date: '2022-01-30',
        teacher: 'Teacher 1'
      },
      {
        course_id: 2,
        course_name: 'Course 2',
        course_description: 'Description 2',
        start_date: '2022-02-01',
        end_date: '2022-02-28',
        teacher: 'Teacher 2'
      }
    ];

    sinon.stub(Course, 'findAll').resolves(courses);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getCourses(req, res);

    sinon.assert.calledOnce(Course.findAll);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, [
      {
        id: 1,
        name: 'Course 1',
        description: 'Description 1',
        startDate: '2022-01-01',
        endDate: '2022-01-30',
        teacher: 'Teacher 1'
      },
      {
        id: 2,
        name: 'Course 2',
        description: 'Description 2',
        startDate: '2022-02-01',
        endDate: '2022-02-28',
        teacher: 'Teacher 2'
      }
    ]);
  });

  it('should return a 500 error if an error occurs', async () => {
    const errorMessage = 'Error occurred';
    sinon.stub(Course, 'findAll').throws(new Error(errorMessage));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await getCourses(req, res);

    sinon.assert.calledOnce(Course.findAll);
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { error: errorMessage });
  });
});