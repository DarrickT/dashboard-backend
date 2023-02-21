class BaseController {
  constructor (model) {
    this.model = model
  }

  testRoute (_req, res) {
    return res.send('yup, you got me')
  }
  authedTest (req, res) {
    return res.json({ success: true, users: req.user })
  }
}

module.exports = BaseController
