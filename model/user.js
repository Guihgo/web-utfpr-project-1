const Model = require("../model/BaseModel")

class UserModel extends Model {
    async signUp(name, email, password) {
        const user = await (this.DB.user.findOne({email}))
        if(user) return {
            error: `User '${email}' already exists`
        }

        const newUser = await this.DB.user.insertOne({name, email, password})

        return {
            user: newUser
        }
    }

    async listAll() {
        const allUsers = await (this.DB.user.find({})).toArray()
        // console.log(allUsers)
        return allUsers
    }
}

module.exports = new UserModel()