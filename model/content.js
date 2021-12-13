const Model = require("../model/BaseModel")

class ContentModel extends Model {   

    async list(search = '') {
        const query = (search!=='')? {title: { $regex: new RegExp(`\\.*${search}\\.*`, "g") }}  : {}
        return this.DB.content.find(query).toArray()
    }
}

module.exports = new ContentModel()