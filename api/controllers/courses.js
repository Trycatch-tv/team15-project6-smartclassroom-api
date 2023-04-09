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

export const editCourseDetail = async (req, res) => {
  try {
    res.status(200).json({ message: 'editing course detail' })
  } catch (err) {
    res.status(404).json(err)
  }
}

export const deleteCourse = async (req, res) => {
  try {
    res.status(200).json({ message: 'delete course' })
  } catch (err) {
    res.status(404).json(err)
  }
}
