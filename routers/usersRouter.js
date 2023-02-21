const express = require('express')
const router = express.Router()

class UsersRouter {
  constructor (controller, auth) {
    this.controller = controller
    this.auth = auth
  }

  routes () {
    router.post('/signUp', this.controller.signUp.bind(this.controller))
    router.post('/logIn', this.controller.logIn.bind(this.controller))
    router.get('/test', this.controller.testRoute.bind(this.controller))
    router.use(this.auth)
    router.get('/postAuth', this.controller.authedTest.bind(this.controller))
    router.post('/createType', this.controller.createType.bind(this.controller))
    router.get(
      '/allTypes/:usersId',
      this.controller.getAllTypes.bind(this.controller)
    )
    router.delete(
      '/deleteType/:id',
      this.controller.deleteType.bind(this.controller)
    )

    return router
  }
}

module.exports = UsersRouter
