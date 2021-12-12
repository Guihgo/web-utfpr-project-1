const { Router } = require("express")
const {UserModel} = require("../model/index")

const router = new Router()

router.get('/', async (req, res)=>{
    const allUsers = await UserModel.listAll()
    console.log(allUsers)
    res.send('You are on /user/')
})

router.post(`/`, async(req, res) => {
    const result  = await UserModel.signUp(req.body.name, req.body.email, req.body.password)
    return res.send(result)
})

module.exports = router