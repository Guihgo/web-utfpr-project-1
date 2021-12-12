const Model = require("../model/BaseModel")

class UserModel extends Model {
    signIn() {
        
    }

    async listAll() {

        const allUsers = await (this.DB.user.find({})).toArray()
        console.log(allUsers)
        return allUsers
    }
}

module.exports = new UserModel()