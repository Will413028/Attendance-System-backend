const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const chai = require('chai')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const UserModel = require('../../models/user')

describe('# User Model', () => {
  const User = UserModel(sequelize, dataTypes)
  const user = new User()
  checkModelName(User)('User')

  context('properties', () => {
    ;[
      'name', 'account', 'password', 'role'
    ].forEach(checkPropertyExists(user))
  })

  context('associations', () => {
    const Attendance = 'Attendance'
    before(() => {
      User.associate({ Attendance })
    })
    it('defined the hasMany association with Attendance', () => {
      expect(User.hasMany).to.have.been.calledWith(Attendance)
    })
  })
})