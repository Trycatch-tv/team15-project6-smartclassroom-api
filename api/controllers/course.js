export const courseDetail = async (req, res) => {
  try {
    res.status(200).json({ message: 'course detail' })
  } catch (err) {
    res.status(404).json(err)
  }
}
