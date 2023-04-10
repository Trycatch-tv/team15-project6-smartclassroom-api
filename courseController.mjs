export const getCourses = async (req, res) => {
    try { 
      //(código de estado HTTP 200)
      res.status(200).json({message: 'showing the courses'});
    } catch (error) {
      // Si ocurre algún error, enviamos una respuesta con un mensaje de error y un código de estado HTTP 500 (Error interno del servidor)
      res.status(500).json({ message: 'Failed to display courses' });
    }
  };