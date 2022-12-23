const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

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
  })
})