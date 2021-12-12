const { Router } = require('express')

module.exports.UserController = require('./user') 
module.exports.ContentController = require('./content')
module.exports.AuthController = require('./auth')

module.exports.APIController = new Router()

this.APIController.get('/', (req,res)=>{
    return res.send({version: '1.0.0'})
})

this.APIController.use('/auth', this.AuthController)
this.APIController.use('/user', this.UserController)
this.APIController.use('/content', this.ContentController)