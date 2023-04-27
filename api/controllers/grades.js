import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'
import { Student } from '../models/Students.js'
import { Op } from 'sequelize'

export const getGradesByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId

    if (!courseId) {
      return res.sendStatus(400)
    }

    const course = await Course.findByPk(courseId)

    if (!course) {
      return res.sendStatus(404)
    }

    const registrations = await Registration.findAll({ where: { course_id: courseId } })
    const registrationIds = registrations.map((registration) => registration.registration_id);

    const grades = await Grade.findAll({
      include: [{
        model: Registration,
        include: [{
          model: Student,
          attributes: ['student_id', 'student_name']
        }]
      }],
      where: {
        registration_id: {
          [Op.in]: registrationIds,
        },
      }
    })

    const data = grades.map(grade => ({
      studentId: grade.registration.student.student_id,
      studentName: grade.registration.student.student_name,
      grade1: grade.grade1,
      grade2: grade.grade2,
      grade3: grade.grade3,
      grade4: grade.grade4,
      grade5: grade.grade5,
      final: parseFloat(((grade.grade1+grade.grade2+grade.grade3+grade.grade4+grade.grade5)/5).toFixed(2))
    }))
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

export const getGradesByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId

    if (!studentId) {
      return res.sendStatus(400)
    }
    
    const student = await Student.findByPk(studentId)

    if (!student) {
      return res.sendStatus(404)
    }

    const registrations = await Registration.findAll({ where: { student_id: studentId } })
    const registrationIds = registrations.map((registration) => registration.registration_id);

    const grades = await Grade.findAll({
      include: [{
        model: Registration,
        include: [{
          model: Course,
          attributes: ['course_id', 'course_name']
        }]
      }],
      where: {
        registration_id: {
          [Op.in]: registrationIds,
        },
      }
    })

    const data = grades.map(grade => ({
      courseId: grade.registration.course.course_id,
      courseName: grade.registration.course.course_name,
      grade1: grade.grade1,
      grade2: grade.grade2,
      grade3: grade.grade3,
      grade4: grade.grade4,
      grade5: grade.grade5,
      final: parseFloat(((grade.grade1+grade.grade2+grade.grade3+grade.grade4+grade.grade5)/5).toFixed(2))
    }))

    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}
