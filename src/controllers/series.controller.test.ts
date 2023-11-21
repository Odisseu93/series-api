import { app } from '../mock/app'
import request from 'supertest'

describe('test series controller', () => {
  it('should be able to obtain data from some series', async () => {
    await request(app)
      .get('/')
      .query({ name: 'supernatural' })
      .expect('Content-Type', /json/)
      .expect(200)

    await request(app)
      .get('/')
      .query({ name: 'game_of_thrones' })
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('should not be able to obtain data from some series', () => {
    request(app)
      .get('/')
      .query({ name: 'true_blood' })
      .expect('Content-Type', /json/)
      .expect(404)

    request(app).get('/').expect('Content-Type', /json/).expect(404)

    request(app)
      .get('/')
      .query({ title: 'supernatural' })
      .expect('Content-Type', /json/)
      .expect(404)
  })
})
