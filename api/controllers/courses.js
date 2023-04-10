export const courseDetail = async (req, res) => {
  try {
    res.status(200).json({ message: 'course detail' })
  } catch (err) {
    res.status(404).json(err)
  }
}

export const createCourse = async (req, res) => {
  try {
    res.status(200).json({ message: 'create course' })
  } catch (err) {
    res.status(404).json(err)
  }
}
export const getCourses = async (req, res) => {
  try {
    //  (código de estado HTTP 200)
    res.status(200).json({ message: 'showing the courses' })
  } catch (error) {
    // Si ocurre algún error, enviamos una respuesta con un mensaje de error y un código de estado HTTP 500 (Error interno del servidor)
    res.status(500).json({ message: 'Failed to display courses' })
  }
}

export const editCourseDetail = async (req, res) => {
  try {
    res.status(200)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const deleteCourse = async (req, res) => {
  try {
    res.status(200)
  } catch (err) {
    res.status(400).json(err)
  }
}
