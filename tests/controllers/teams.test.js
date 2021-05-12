const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllTeams, getTeamById, addNewTeam } = require('../../controller/teamsFunctions')
const models = require ('../../models')
const { teamsList, singleTeam } = require('../mocks/teams')
const { req } = require('express')

chai.use(sinonChai)
const { expect } = chai

describe('Teams Controller', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne = sinon.stub(models.teams, 'findOne')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
  })

  describe('Get all teams', () => {
    it('gets a list of teams from DB and calls response.send() with that list', async () => {
      const stubbedFindAll = sinon.stub(models.teams, 'findAll').returns(teamsList)
      const stubbedSend = sinon.stub()
      const res = { send: stubbedSend }

      await getAllTeams({}, res)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamsList)
    })
  })

  describe('Get team by id', () => {
    it('get a team with the provided DB and calls response.send() with it', async () => {
      stubbedFindOne.returns(singleTeam)
      const req = { params: { id: 3 } }
      const stubbedSend = sinon.stub()
      const res = { send: stubbedSend }

      await getTeamById(req, res)
      expect(stubbedFindOne).to.have.callCount(1)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 3 } })
      expect(stubbedSend).to.have.been.calledWith(singleTeam)
    })

    it('return a 404 when no team is found', async () => {
      stubbedFindOne.returns(null)
      const req = { params: { id: 'not-found' } }
      const stubbedSendStatus = sinon.stub()
      const res = { sendStatus: stubbedSendStatus }

      await getTeamById(req, res)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)

      it('returns a 500 error with a message', async () => {
        stubbedFindOne.throws('Error!')
        const req = { params: { id: 'erroneous-id' } }
        
        const stubbedSend = sinon.stub()
        const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
        const res = { status: stubbedStatus }

        await getTeamById(req, res)
        expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 'erroneous-id' } })
        expect(stubbedStatus).to.have.been.calledWith(500)
        expect(stubbedSend).to.have.been.calledWith('unable to retrieve team, please try again')
      })
    })

    describe('Save new team', () => {
      it('accepts new team info and saves the team with a 201 status', async () => {
        const stubbedCreate = sinon.stub(models.teams, 'create').returns(singleTeam)
        const req = { body: singleTeam }
        const stubbedSend = sinon.stub()
        const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
        const res = { status: stubbedStatus }

        await addNewTeam(req, res)

        expect(stubbedCreate).to.have.been.calledWith(singleTeam)
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedSend).to.have.been.calledWith(singleTeam)
      })
    })
  })
})

