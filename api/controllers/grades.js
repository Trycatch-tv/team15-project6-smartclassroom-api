import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Student } from '../models/Students.js'

export const getGradesByCourse = async (req, res) => {
  try {
    const courseId = req.query.course_id
    const course = await Course.findOne({
      where: { course_id: courseId }
    })
    if (!course) {
      return res.sendStatus(404)
    }
    // Consultamos las notas de los estudiantes para el curso especificado
    const grades = await Grade.findAll({
      where: { course_id: courseId },
      attributes: ['grade1', 'grade2', 'grade3', 'grade4', 'grade5'],
      include: [
        {
          model: Student,
          attributes: ['student_name']
        },
        {
          model: Course,
          attributes: ['course_name']
        }
      ]
    })
    // Modelando la vista de los datos a presentar
    const data = grades.map(grade => ({
      course_name: grade.course.course_name,
      student_name: grade.student.student_name,
      grade1: grade.grade1,
      grade2: grade.grade2,
      grade3: grade.grade3,
      grade4: grade.grade4,
      grade5: grade.grade5
    }))
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
