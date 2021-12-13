const jwt = require('jsonwebtoken')

module.exports.UseAuthMiddleware = (req,res, next)=>{
    // console.log(`TODO: auth middle !`, req.header('Authorization'))
    
    let token = req.header('Authorization')

    if(!token) return res.status(401).send({
        error: `Unauthorized`
    }) 

    token = token.replace('Bearer ', '')

    try {
         const result = jwt.verify(token, process.env.JWT_AUTH, {
            algorithms: 'HS512'
        })
        
        if(!result) return res.status(401).send({
            error: `Unauthorized`
        }) 
        req.user = {
            id: result.id,
            email: result.email
        }
        req.isAdmin = result.isAdmin
    } catch(e) {
        console.error(e)
       return res.status(401).send({
            error: `Unauthorized`
        }) 
    }
    
    next()
}

module.exports.UseAdminAuthMiddleware = (req, res, next)=>{
    if(!req.isAdmin) return res.status(401).send({
            error: `You must be admin. Unauthorized.`
    }) 

    next()
}