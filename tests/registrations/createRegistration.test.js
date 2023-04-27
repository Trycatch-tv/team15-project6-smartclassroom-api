/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { createRegistration } from '../../api/controllers/registrations'
import { Course } from '../../api/models/Courses'
import { Registration } from '../../api/models/Registrations'
import { Student } from '../../api/models/Students'
import sinon from 'sinon'

describe('createRegistration', () => {
  let req;
  let res;
  let statusStub;
  let sendStatusStub;
  let sendStub;
  let findByPkStub;
  let countStub;
  let createStub;
  let setStudentStub;
  let setCourseStub;

  beforeEach(() => {
    req = {
      body: {
        studentId: 1,
        courseId: 2
      }
    };
    res = {
      sendStatus: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    statusStub = res.status;
    sendStatusStub = res.sendStatus;
    sendStub = res.send;
    findByPkStub = sinon.stub();
    countStub = sinon.stub();
    createStub = sinon.stub();
    setStudentStub = sinon.stub();
    setCourseStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create registration successfully', async () => {
    const student = {
      id: 1
    };
    const course = {
      id: 2
    };
    const registration = {
      setStudent: setStudentStub,
      setCourse: setCourseStub
    };
    findByPkStub.withArgs(1).returns(student);
    findByPkStub.withArgs(2).returns(course);
    countStub.returns(0);
    createStub.returns(registration);

    await createRegistration(req, res);

    expect(findByPkStub.calledTwice).toBe(true);
    expect(findByPkStub.firstCall.args[0]).toBe(1);
    expect(findByPkStub.secondCall.args[0]).toBe(2);
    expect(countStub.calledOnceWith({
      where: {
        student_id: 1,
        course_id: 2
      }
    })).toBe(true);
    expect(createStub.calledOnceWith({
      student_id: 1,
      course_id: 2,
      registration_date: sinon.match.string
    })).toBe(true);
    expect(setStudentStub.calledOnceWith(student)).toBe(true);
    expect(setCourseStub.calledOnceWith(course)).toBe(true);
    expect(sendStatusStub.calledOnceWith(201)).toBe(true);
  });

})
