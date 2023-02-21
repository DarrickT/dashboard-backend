const BaseController = require('./baseController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UsersController extends BaseController {
  constructor (model, types) {
    super(model)
    this.types = types
  }

  async signUp (req, res) {
    //taking in the data from req.body fields thus, const name, email, password
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ sucess: false, msg: 'you have some missing information' })
    }
    console.log('anything')
    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await this.model.create({
        name,
        email,
        password: hashedPassword
      })

      {
        //  "name": "Testing",
        //  "email": "testing123@gmail.com",
        //  "password": "Password"
      }

      const payload = { id: newUser.id, name: newUser.name }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1hour'
      })

      return res.json({ success: true, token })
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  async createType (req, res) {
    const { type, price, cost, usersId } = req.body
    if (!type || !price || !cost || !usersId) {
      return res
        .status(400)
        .json({ sucess: false, msg: 'you have some missing information' })
    }
    try {
      const newType = await this.types.create({
        type,
        price,
        cost,
        usersId: usersId
      })
      console.log(newType)

      return res.json({ sucess: true, newType })
    } catch (error) {
      res.status(400).json({ error })
    }
  }
  // get all the types from single user
  async getAllTypes (req, res) {
    const { usersId } = req.params
    if (!usersId) {
      return res
        .status(400)
        .json({ sucess: false, msg: 'you have some missing information' })
    }
    try {
      const allTypes = await this.types.findAll({
        where: { usersId: usersId }
      })
      return res.json({ sucess: true, allTypes })
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}
module.exports = UsersController
