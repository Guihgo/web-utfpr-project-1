const jwt = require('jsonwebtoken')

const Model = require("../model/BaseModel")

class AuthModel extends Model {    
    async login(email, password) {
        
        const user = await this.DB.user.findOne({email, password})
        if(!user) return {
            token: null
        } 

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_AUTH, {
            algorithm:'HS512',
            expiresIn: '24h',
        })

        return {
            token,
            isAdmin: user.isAdmin
        }
    }
}

module.exports = new AuthModel()