const express = require('express')
const router = express.Router()

class UsersRouter {
  constructor (controller) {
    this.controller = controller
  }

  routes () {
    router.get('/test', this.controller.testRoute.bind(this.controller))
    router.post('/signUp', this.controller.signUp.bind(this.controller))
    router.post('/createType', this.controller.createType.bind(this.controller))
    router.get(
      '/allTypes/:usersId',
      this.controller.getAllTypes.bind(this.controller)
    )

    return router
  }
}
// VP - get all different types via allTypes routes - displayed it on FE.
// when he wants to add a subscriber, i draw back all types.
// i have a form ; enter details name date, email and choose the type and hit submit
// once user hit "submits" ,
module.exports = UsersRouter
