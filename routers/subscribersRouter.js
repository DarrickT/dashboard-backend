const express = require('express')

const router = express.Router()

class SubscribersRouter {
  constructor (controller) {
    this.controller = controller
  }

  routes () {
    router.get('/test', this.controller.testRoute.bind(this.controller))
    router.get(
      '/filterByYear/:usersId/:year',
      this.controller.filterByYear.bind(this.controller)
    )
    router.post(
      '/addSubscriber',
      this.controller.addSubcriber.bind(this.controller)
    )
    router.get(
      '/allSubscriber/:usersId',
      this.controller.getAllSubscribers.bind(this.controller)
    )

    // router.post(
    //   '/addSubcriber/:usersId',
    //   this.controller.addSubcriber.bind(this.controller)
    // )
    // router.delete(
    //   '/deleteSubscriber/:id',
    //   this.controller.deleteSubscriber.bind(this.controller)
    // )
    // router.put(
    //   '/editSubscriber/:id',
    //   this.controller.editSubscriber.bind(this.controller)
    // )
    return router
  }
}

module.exports = SubscribersRouter
