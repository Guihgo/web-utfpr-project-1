const { ObjectId } = require("bson")
const Model = require("../model/BaseModel")

class ContentModel extends Model {   

    async list(search = '') {
        const query = (search!=='')? {title: { $regex: new RegExp(`\\.*${search}\\.*`, "g") }}  : {}
        return this.DB.content.find(query).toArray()
    }

    async add(title, description, type, author) {
        return this.DB.content.insertOne({
            author: ObjectId(author),
            title,
            description,
            type,
        })
    }
}

module.exports = new ContentModel()