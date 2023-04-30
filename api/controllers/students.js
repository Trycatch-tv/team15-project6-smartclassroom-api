import { Student } from '../models/Students.js'
import { Grade } from '../models/Grades.js'
import { Registration } from '../models/Registrations.js'
import { Course } from '../models/Courses.js'
import { Op, Sequelize } from 'sequelize'

export const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({ order: [['student_name', 'ASC']] })

    const studentList = students.map(student => ({
      studentId: student.student_id,
      studentName: student.student_name,
      nationalId: student.national_number_id,
      email: student.email,
      phone: student.phone
    }))

    res.status(200).json(studentList)
  } catch (err) {
    res.status(404).json(err.message)
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
      studentId: student.student_id,
      studentName: student.student_name,
      nationalId: student.national_number_id,
      email: student.email,
      phone: student.phone
    }

    return res.status(200).json(studentDetail)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params

    const studentToDelete = await Student.findByPk(id)

    if(studentToDelete == null){
      return res.status(404).json({ error: 'Student not found' })
    }

    const registrationsToDeleteCount = await Registration.count({ where: { student_id: id }})
    
    if (registrationsToDeleteCount > 0) {
      
      await Grade.destroy({
        where: {
          registration_id: {
            [Op.in]: Sequelize.literal(
              `(SELECT registration_id FROM registrations WHERE student_id = ${id})`
            )
          }
        }
      })
      
      await Registration.destroy({ where: { student_id: id } })
    }

    await Student.destroy({ where: { student_id: id } })

    return res.status(200).json({ message: 'Student deleted' })
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getCount = async (req, res) => {
  try {
    const count = await Student.count()
    res.status(200).json({ studentsCount: count })
  } catch (err) {
    res.status(500).json(err.message)
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
    res.status(500).json(err.message)
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
    res.status(500).json(err.message)
  }
}

export const notEnrolledStudent = async (req, res) => {
  try {
    const courseId = req.query.courseId
    const course = await Course.findByPk(courseId)
    if (!course) {
      return res.sendStatus(404)
    }

    const studentsWithoutRegistration = await Student.findAll({
      where: {
        student_id: {
          [Op.notIn]: Sequelize.literal(
            `(SELECT student_id FROM registrations WHERE course_id = ${courseId})`
          )
        }
      }
    });

    const studentList = studentsWithoutRegistration.map(student => ({
      studentId: student.student_id,
      studentName: student.student_name,
      nationalId: student.national_number_id,
      email: student.email,
      phone: student.phone
    }))

    res.status(200).json(studentList)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
