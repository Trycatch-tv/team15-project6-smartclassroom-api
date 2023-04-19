/* eslint-disable no-undef */
// adding and importing the necessary dependencies and modules
import { getGradesByCourse } from '../../api/controllers/grades'
import { Course } from '../../api/models/Courses'
import { Grade } from '../../api/models/Grades'
import { Student } from '../../api/models/Students'
import sinon from 'sinon'

describe('getGradesByCourse', () => {
  // Creating the first two mocks request object with it's required parameters
  const req = {
    params: { id: 1 }
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  // Setting up our stubs before each test
  beforeEach(() => {
    sinon.stub(Course, 'findOne')
    sinon.stub(Grade, 'findAll')
    sinon.stub(Student, 'belongsTo')
  })

  // Cleaning up our stubs after the test
  afterEach(() => {
    sinon.restore()
  })

  it('should return the grades of a course', async () => {
    // Creating a mock data for our Models (Course and Grade), here we are simulating
    const courseMock = {
      course_id: 1,
      course_name: 'Progrmación III'
    }
    const gradeMock = [
      {
        student_id: 1,
        grade1: 4.5,
        grade2: 3.5,
        grade3: 4.0,
        grade4: 2.5,
        grade5: 3.0,
        // Adding the student for the data
        student: {
          student_id: 1,
          student_name: 'Luis Lopez'
        },
        course: {
          course_id: 1,
          course_name: 'Progrmación III'
        }
      },
      {
        student_id: 2,
        grade1: 3.0,
        grade2: 3.5,
        grade3: 3.0,
        grade4: 4.0,
        grade5: 4.5,
        student: {
          student_id: 2,
          student_name: 'Dylan Suarez'
        },
        course: {
          course_id: 1,
          course_name: 'Progrmación III'
        }
      }
    ]

    Course.findOne.resolves(courseMock)
    Grade.findAll.resolves(gradeMock)

    // Calling the function and checking if expected results are returned
    await getGradesByCourse(req, res)

    expect(Course.findOne.calledOnceWith({ where: { course_id: 1 } })).toBeTruthy()
    // Expecting all the grades for the course mentioned
    expect(Grade.findAll.calledOnceWith({
      where: { course_id: 1 },
      attributes: ['grade1', 'grade2', 'grade3', 'grade4', 'grade5'],
      include: [
        {
          model: Student,
          attributes: ['student_id', 'student_name']
        },
        {
          model: Course,
          attributes: ['course_name']
        }
      ]
    })).toBeTruthy()
    expect(res.status.mock.calls.length).toBe(1)
    expect(res.status.mock.calls[0][0]).toBe(200)
    expect(res.json.mock.calls.length).toBe(1)
    expect(res.json.mock.calls[0][0]).toEqual([
      {
        studentId: 1,
        studentName: 'Luis Lopez',
        grade1: 4.5,
        grade2: 3.5,
        grade3: 4.0,
        grade4: 2.5,
        grade5: 3.0
      },
      {
        studentId: 2,
        studentName: 'Dylan Suarez',
        grade1: 3.0,
        grade2: 3.5,
        grade3: 3.0,
        grade4: 4.0,
        grade5: 4.5
      }
    ])
  })

  it('should return a 404 if course id is missing', async () => {
    const req = {
      params: { }
    }
    const res = {
      sendStatus: jest.fn()
    }

    await getGradesByCourse(req, res)

    expect(res.sendStatus.mock.calls.length).toBe(1)
    expect(res.sendStatus.mock.calls[0][0]).toBe(404)
    // making fail this part
    // expect(res.sendStatus.mock.calls.length).toBe(2)
  })
})
