const { Router } = require("express")
const {UseAuthMiddleware, UseAdminAuthMiddleware} = require("../middleware/auth")
const {ContentModel} = require("../model/index")

const router = new Router()

router.use(UseAuthMiddleware)
router.get('/', async (req, res) => {
    const result = await ContentModel.list(req.query.search)
    res.send(result.reverse())
})


router.use(UseAdminAuthMiddleware)
router.post('/', async (req, res)=>{
    const result = await ContentModel.add(req.body.title, req.body.description, req.body.type, req.user.id)
    return res.send(result)
})


module.exports = router