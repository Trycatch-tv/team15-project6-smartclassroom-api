import app from '../api/app'
import request from 'supertest'

describe('courseDetail function', () => {
  test('Shoul response with a 200 status', async () => {
    const response = await request(app).get('/api/courses').send()
    expect(response.statusCode).toBe(200)
  })
})
