const { Router } = require("express")
const {UseAuthMiddleware} = require("../middleware/auth")

const router = new Router()

router.use(UseAuthMiddleware)

router.get('/', (req, res)=>{
    res.send('You are on /content/')
})

router.get('/lk', (req, res)=>{
    res.send('You are on /content/lk')
})

module.exports = router