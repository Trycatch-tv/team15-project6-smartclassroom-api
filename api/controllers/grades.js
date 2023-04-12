import { Course } from '../models/Courses.js'
import { Grade } from '../models/Grades.js'
import { Student } from '../models/Students.js'

export const getGrades = async (req, res) => {
  const { id } = req.params
  try {
    const course = await Course.findByPk(id)
    if (!course) {
      return res.status(404).json({ message: `Course with id ${id} not found` })
    }

    const grades = await Grade.findAll({
      where: { course_id: id },
      include: [
        {
          model: Student,
          attributes: ['student_name']
        }
      ],
      attributes: ['grade1', 'grade2', 'grade3', 'grade4', 'grade5']
    })

    const gradesData = grades.map((grade) => ({
      studentName: grade.Student.student_name,
      grade1: grade.grade1,
      grade2: grade.grade2,
      grade3: grade.grade3,
      grade4: grade.grade4,
      grade5: grade.grade5
    }))

    return res.status(200).json({ courseName: course.course_name, grades: gradesData })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// esto ⬇️ nada mas lo puse aquí de respaldo ya que estaba probando localmente
// PORT=3000
// DB_USER=dev_user_SmartClassroomDB
// DB_PWD=^^k@0j6izX&BkUFd
// DB_NAME=smartclassroomdb
// DB_HOST=training-db-server.mysql.database.azure.com
