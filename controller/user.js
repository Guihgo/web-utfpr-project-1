const { Router } = require("express")
const {UserModel} = require("../model/index")

const router = new Router()

router.get('/', async (req, res)=>{
    const allUsers = await UserModel.listAll()
    console.log(allUsers)
    res.send('You are on /user/')
})

module.exports = router