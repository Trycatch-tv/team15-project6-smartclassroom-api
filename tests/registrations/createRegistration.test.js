/* eslint-disable no-undef */
import { createRegistration } from '../../api/controllers/registrations'
import { Course } from '../../api/models/Courses'
import { Registration } from '../../api/models/Registrations'
import { Student } from '../../api/models/Students'

describe('createRegistration', () => {
  it('should create a new registration', async () => {
    const mockReq = {
      body: {
        student_id: 1,
        course_id: 1,
        registration_date: '2022-05-01',
        cancellation_date: '2022-06-01'
      }
    }
    const mockRes = {
      sendStatus: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const mockStudent = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-1234'
    }
    const mockCourse = {
      id: 1,
      name: 'Mathematics',
      description: 'Basic math course',
      start_date: '2022-01-01',
      end_date: '2022-06-01',
      teacher: 'Jane Smith'
    }
    const mockRegistration = {
      id: 1,
      registration_date: '2022-05-01',
      cancellation_date: '2022-06-01',
      setStudent: jest.fn().mockReturnThis(),
      setCourse: jest.fn().mockReturnThis()
    }
    jest.spyOn(Student, 'findByPk').mockResolvedValue(mockStudent)
    jest.spyOn(Course, 'findByPk').mockResolvedValue(mockCourse)
    jest.spyOn(Registration, 'create').mockResolvedValue(mockRegistration)

    await createRegistration(mockReq, mockRes)

    expect(mockRes.sendStatus).toHaveBeenCalledWith(201)
    // If you want to fail this test  "should create a new registration"
    // You can change the expected values of Student and Course
    expect(Student.findByPk).toHaveBeenCalledWith(mockReq.body.student_id)
    expect(Course.findByPk).toHaveBeenCalledWith(mockReq.body.course_id)
    expect(Registration.create).toHaveBeenCalledWith({
      registration_date: mockReq.body.registration_date,
      cancellation_date: mockReq.body.cancellation_date || null
    })
    expect(mockRegistration.setStudent).toHaveBeenCalledWith(mockStudent)
    expect(mockRegistration.setCourse).toHaveBeenCalledWith(mockCourse)
  })

  it('should return a 404 if the student is not found', async () => {
    const mockReq = {
      body: {
        student_id: '',
        course_id: null
      }
    }
    const mockRes = {
      sendStatus: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    jest.spyOn(Student, 'findByPk').mockResolvedValue(null)

    await createRegistration(mockReq, mockRes)

    expect(mockRes.sendStatus).toHaveBeenCalledWith(404)
  })
})
