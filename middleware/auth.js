const jwt = require('jsonwebtoken')

module.exports.UseAuthMiddleware = (req,res, next)=>{
    console.log(`TODO: auth middle !`)
    /* if(!isAuth) {
        return res.redirect('/#login')
    }
    */
    next()
}