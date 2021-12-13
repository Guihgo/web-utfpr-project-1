const jwt = require('jsonwebtoken')

module.exports.UseAuthMiddleware = (req,res, next)=>{
    console.log(`TODO: auth middle !`, req.header('Authorization'))
    /* if(!isAuth) {
        return res.redirect('/#login')
    }
    */
    next()
}