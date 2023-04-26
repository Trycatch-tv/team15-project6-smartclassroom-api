import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Student } from '../models/Students.js'

export const getGradesByCourse = async (req, res) => {
  try {
    const courseId = req.params.id
    if (!courseId) {
      return res.sendStatus(404)
    }
    // Consultando las notas del curso especificado
    const course = await Course.findOne({
      where: { course_id: courseId }
    })
    if (!course) {
      return res.sendStatus(404)
    }
    const grades = await Grade.findAll({
      where: { course_id: courseId },
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
    })
    // Modelando los datos para mostrarlos
    const data = grades.map(grade => ({
      studentId: grade.student.student_id,
      studentName: grade.student.student_name,
      grade1: grade.grade1,
      grade2: grade.grade2,
      grade3: grade.grade3,
      grade4: grade.grade4,
      grade5: grade.grade5
    }))
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const getGradesByStudent = async (req, res) => {
  try {
    const studentId = req.params.id
    if (!studentId) {
      return res.sendStatus(404)
    }
    // Consultando las notas del curso especificado
    const student = await Student.findOne({
      where: { student_id: studentId }
    })
    if (!student) {
      return res.sendStatus(404)
    }
    const grades = await Grade.findAll({
      where: { student_id: studentId },
      attributes: ['grade1', 'grade2', 'grade3', 'grade4', 'grade5'],
      include: [
        {
          model: Student,
          attributes: ['student_name']
        },
        {
          model: Course,
          attributes: ['course_id', 'course_name']
        }
      ]
    })
    const data = grades.map(grade => ({
      courseId: grade.course.course_id,
      courseName: grade.course.course_name,
      grade1: grade.grade1,
      grade2: grade.grade2,
      grade3: grade.grade3,
      grade4: grade.grade4,
      grade5: grade.grade5
    }))
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json(err)
  }
}
