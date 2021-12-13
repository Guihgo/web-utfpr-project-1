const { Router } = require("express")
const {UseAuthMiddleware} = require("../middleware/auth")
const {ContentModel} = require("../model/index")

const router = new Router()

router.use(UseAuthMiddleware)

router.get('/', async (req, res) => {
    const result = await ContentModel.list(req.query.search)
    res.send(result)
})


module.exports = router