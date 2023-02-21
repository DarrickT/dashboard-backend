const { Op } = require('sequelize')
const subcribers = require('../models/subscribers')
const BaseController = require('./baseController')

class SubscribersController extends BaseController {
  constructor (model) {
    super(model)
  }

  // add subscriber for single user
  async addSubcriber (req, res) {
    const { fullName, email, date, typesId, usersId } = req.body

    try {
      const newSubscriber = await this.model.create({
        fullName: fullName,
        date: date,
        email: email,
        typesId: typesId,
        usersId: usersId
      })

      res.status(200).json({ sucess: true, newSubscriber })
    } catch (error) {
      res.status(400).json({ error })
    }
  }
  // get all subscribers from single user
  async getAllSubscribers (req, res) {
    const { usersId } = req.params
    if (!usersId) {
      return res
        .status(400)
        .json({ sucess: false, msg: 'you have some missing information' })
    }
    try {
      const allSubscribers = await this.model.findAll({
        where: { usersId: usersId }
      })
      return res.json({ sucess: true, allSubscribers })
    } catch (error) {
      res.status(400).json({ error })
    }
  }
  //filterByYear
  async filterByYear (req, res) {
    const { usersId, year } = req.params
    const startDate = new Date(`${year}-01-01 00:00:00`)
    const endDate = new Date(`${year}-12-31 23:59:59`)

    if (!usersId || !year) {
      return res
        .status(400)
        .json({ sucess: false, msg: 'you have some missing information' })
    }
    try {
      const dataByYear = await this.model.findAll({
        where: {
          usersId: usersId,
          date: {
            [Op.between]: [startDate, endDate]
          }
        }
      })

      return res.json({ sucess: true, dataByYear })
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  //delete Subscriber
  async deleteSubscriber (req, res) {
    let id = req.params.id
    await this.model.findByPk(id)
    if (!id) {
      return res.status(404).json({ error: 'no such subscriber exist' })
    }
    try {
      await this.model.destroy({
        where: { id }
      })
      let data = await this.model.findAll()
      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  // async editClient (req, res) {
  //   const { fullName, email, date, subscriptionType, paymentAmount } = req.body
  //   let clientsId = req.params.id

  //   try {
  //     let editedClient = await this.model.findByPk(clientsId)
  //     if (editedClient) {
  //       await editedClient.update({
  //         fullName: fullName,
  //         date: date,
  //         email: email,
  //         subscriptionType: subscriptionType,
  //         paymentAmount: paymentAmount
  //       })
  //     }
  //     editedClient = await this.model.findByPk(clientsId)
  //     return res.json(editedClient)
  //   } catch (error) {
  //     console.log(error)
  //     return res.status(400).json({ error })
  //   }
  // }
}

module.exports = SubscribersController
