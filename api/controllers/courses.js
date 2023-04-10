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
    res.status(200).json({ message: 'showing the courses' })
  } catch (err) {
    // Si ocurre algún error, enviamos una respuesta con un mensaje de error y un código de estado HTTP 500 (Error interno del servidor)
    res.status(500).json({ message: 'Failed to display courses' })
  }
}
