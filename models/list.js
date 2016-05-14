var mongodb = require('./mongodb');

var listSchema = new mongodb.mongoose.Schema({
    name: String,
    saying: String
}, {
    collection: 'lists'
});
var listModel = mongodb.mongoose.model('List', listSchema);//数据库模型
function List(list) {
    this.name = list.name;//属性
    this.saying= list.saying;
};//this后面的name与数据库相关，list后面的name与ejs中的name相关

List.get = function (name, callback) {
    listModel.find("name"), function (err, list) {
        if (err) {
            return callback(err);
        }
        callback(null, list);
    };
}//查询

module.exports = List;