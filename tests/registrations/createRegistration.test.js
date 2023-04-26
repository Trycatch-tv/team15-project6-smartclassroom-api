/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { createRegistration } from '../../api/controllers/registrations'
import { Course } from '../../api/models/Courses'
import { Registration } from '../../api/models/Registrations'
import { Student } from '../../api/models/Students'
import sinon from 'sinon'

describe('createRegistration', () => {
  afterEach(() => {
    sinon.restore();
  });

  test('Debería responder con el estado 404 si el estudiante no existe', async () => {
    const req = { body: { studentId: 1, courseId: 1 } };
    const res = { sendStatus: sinon.spy() };
    sinon.stub(Student, 'findByPk').resolves(null);

    await createRegistration(req, res);

    expect(res.sendStatus.calledWith(404)).toBe(true);
  });
});