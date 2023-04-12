import { Student } from '../models/Students.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'

export const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll()

    const studenList = students.map(student => ({
      id: student.student_id,
      name: student.student_name,
      email: student.email,
      phone: student.phone
    }))

    res.status(200).json(studenList)
  } catch (err) {
    res.status(404).json(err)
  }
}

export const studentDetail = async (req, res) => {
  const studenId = req.params.id

  try {
    const student = await Student.findByPk(studenId)

    if (!student) {
      return res.status(404).json({ error: 'Student not found' })
    }

    const studentDetail = {
      id: student.student_id,
      name: student.student_name,
      email: student.email,
      phone: student.phone
    }

    return res.status(200).json(studentDetail)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteStudent = async (req, res) => {
  const { id } = req.params

  try {
    const studentGrade = await Grade.destroy({ where: { student_id: id } })
    const studentRegistration = await Registration.destroy({ where: { student_id: id } })
    const student = await Student.destroy({ where: { student_id: id } })

    if (!student && !studentRegistration && !studentGrade) {
      return res.status(404).json({ error: 'Student not found' })
    }

    return res.status(200).json({ message: 'User deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
