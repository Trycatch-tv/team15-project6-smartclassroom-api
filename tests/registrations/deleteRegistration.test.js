/* eslint-disable no-undef */
/* eslint-disable camelcase */
import sinon from 'sinon'
import { Registration } from '../../api/models/Registrations'
import { deleteRegistration } from '../../api/controllers/registrations'

describe('deleteRegistration', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should delete a registration', async () => {
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
    // test data
    const student_id = 1
    const course_id = 1
    // adding a stub for the 'findOne' function and adding a null if there is not data
    sinon.stub(Registration, 'findOne').resolves(null)
    const req = { body: { student_id, course_id } }
    const res = {
      sendStatus: sinon.spy(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    }

    // calling and waiting for a response of 'deleteRegistration' function
    await deleteRegistration(req, res)

    sinon.assert.calledOnce(Registration.findOne)
    sinon.assert.calledOnce(res.sendStatus)
    sinon.assert.calledWith(res.sendStatus, 404)
  })
})
