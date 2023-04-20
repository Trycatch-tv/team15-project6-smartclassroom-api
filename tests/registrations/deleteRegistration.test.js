/* eslint-disable no-undef */
/* eslint-disable camelcase */
import sinon from 'sinon'
import { Registration } from '../../api/models/Registrations'
import { deleteRegistration } from '../../api/controllers/registrations'

describe('deleteRegistration', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should delete registration', async () => {
  // We create a stub for the 'destroy' method of the Registration instance
    const registrationInstanceStub = sinon.createStubInstance(Registration)
    registrationInstanceStub.destroy.resolves()

    sinon.stub(Registration, 'findOne').resolves(registrationInstanceStub)

    const req = {
      body: { student_id: 1, course_id: 1 }
    }
    const res = {
      sendStatus: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    }

    await deleteRegistration(req, res)

    sinon.assert.calledOnce(Registration.findOne)
    sinon.assert.calledOnce(registrationInstanceStub.destroy)
    sinon.assert.calledOnce(res.sendStatus)
    sinon.assert.calledWith(res.sendStatus, 204)

    // restoring the stubs
    Registration.findOne.restore()
  })

  it('should return 404 if registration is not found', async () => {
    const student_id = 1
    const course_id = 1
    sinon.stub(Registration, 'findOne').resolves(null)
    const destroySpy = sinon.stub(Registration.prototype, 'destroy')
    const req = { body: { student_id, course_id } }
    const res = {
      sendStatus: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    }

    await deleteRegistration(req, res)

    sinon.assert.calledOnce(Registration.findOne)
    sinon.assert.notCalled(destroySpy)
    sinon.assert.calledOnce(res.status)
    sinon.assert.calledWith(res.status, 404)
    sinon.assert.calledOnce(res.json)
    sinon.assert.calledWith(res.json, { error: 'Registration not found' })
  })
})
