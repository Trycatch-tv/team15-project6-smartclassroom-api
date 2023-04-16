import app from '../api/app'
import request from 'supertest'

describe('Controller Courses test function', () => {
  test('Should response with a 200 status, detail Course', async () => {
    const response = await request(app).get('/api/courses/23').send()
    expect(response.statusCode).toBe(200)
  })
  test('Should response with 201 status, create Course', async () => {
    const response = await request(app).post('api/courses').send({
      course_name: 'Quimica Farmaceutica',
      course_description: 'Aprederas cada uno de las ramas de la quimica farmaceutica',
      start_date: '23/05/2023',
      end_date: '28/09/2023',
      teacher: 'Carlos Alberto'
    })
    expect(response.statusCode).tobe(201)
  })
  test('Should response with a 200 status, get Course', async () => {
    const response = (await request(app).get('/api/courses')).send()
    expect(response.statusCode).toBe(200)
  })
  test('Should response with a 200 status, delete Course', async () => {
    const response = (await request(app).delete('/api/courses/23')).send()
    expect(response.statusCode).toBe(200)
  })
  test('Should response with a 200 status, put Course', async () => {
    const response = (await request(app).put('/api/courses/26')).send({
      course_name: 'Calculo integral desde cero',
      course_description: 'Obten una maestria en Calculo integral!'
    })
    expect(response.statusCode).toBe(200)
  })
})
