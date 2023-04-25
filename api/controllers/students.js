import { Student } from '../models/Students.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'
import { Course } from '../models/Courses.js'

export const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ order: [['student_name', 'ASC']] })

    const studenList = students.map(student => ({
      id: student.student_id,
      studentName: student.student_name,
      nationalId: student.national_number_id,
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
      studentName: student.student_name,
      nationalId: student.national_number_id,
      email: student.email,
      phone: student.phone
    }

    return res.status(200).json(studentDetail)
  } catch (err) {
    return res.status(500).json(err)
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
    res.status(500).json(err)
  }
}

export const getCount = async (req, res) => {
  try {
    const count = await Student.count()
    res.status(200).json({ studentsCount: count })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createStudent = async (req, res) => {
  try {
    const newStudent = {
      student_name: req.body.studentName,
      national_number_id: req.body.nationalId,
      email: req.body.email,
      phone: req.body.phone
    }

    await Student.create(newStudent)
    res.sendStatus(201)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const putStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id)
    if (!student) {
      return res.sendStatus(404)
    }
    const { studentName, nationalId, email, phone } = req.body
    student.student_name = studentName
    student.national_number_id = nationalId
    student.email = email
    student.phone = phone

    await student.save()
    res.status(200).json(student)
  } catch (err) {
    res.status(500).json(err)
  }
}

export const notEnrolledStudent = async (req, res) => {
  try {
    const courseId = req.query.courseId
    const course = await Course.findByPk(courseId)
    if (!course) {
      return res.sendStatus(404)
    }

    // Obtener todos los estudiantes matriculados en el curso
    const enrolledStudents = await course.getStudents()

    const enrolledStudentsIdName = enrolledStudents.map(student => ({
      id: student.student_id,
      name: student.student_name
    }))

    // Obtener todos los estudiantes y sus IDs
    const allStudents = await Student.findAll({ order: [['student_name', 'ASC']] })
    const studentList = allStudents.map(student => ({ id: student.student_id, name: student.student_name }))

    // Obtener la lista de estudiantes que no están matriculados en el curso
    const nonEnrolledStudents = studentList.filter(student => !enrolledStudentsIdName.some(({ id }) => id === student.id))
      .map(({ id, name }) => ({ id, name }))

    res.status(200).json(nonEnrolledStudents)
  } catch (err) {
    res.status(500).json(err)
  }
}
