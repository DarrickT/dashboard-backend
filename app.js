const express = require('express')
const cors = require('cors')
require('dotenv').config()
//import models
const db = require('./models/index.js')

// import controllers
const UsersController = require('./controllers/userController')
const SubscribersController = require('./controllers/subscribersController')

//initializing controller
const usersController = new UsersController(db.users, db.types)
const subscribersController = new SubscribersController(db.subscribers)

// import routers
const UsersRouter = require('./routers/usersRouter')
const SubscribersRouter = require('./routers/subscribersRouter')

// intialise routers
const usersRouter = new UsersRouter(usersController).routes()
const subscribersRouter = new SubscribersRouter(subscribersController).routes()

//Putting express together
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', usersRouter)
app.use('/subscribers', subscribersRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
