module.exports.UserModel = require('./user')
module.exports.ContentModel = require('./content')

module.exports.init = (collations)=>{
    this.UserModel.init(collations)
    this.ContentModel.init(collations)
}

