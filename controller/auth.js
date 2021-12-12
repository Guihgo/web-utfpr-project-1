const { Router } = require("express")
const { AuthModel } = require("../model/index")

const router = new Router()

router.post('/login', async (req, res)=>{
    const result = await AuthModel.login(req.body.email,req.body.password)
    res.send(result)
})


module.exports = router