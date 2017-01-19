
import mongoose from 'mongoose';
import express from 'express';
var router = express.Router();

mongoose.connect('mongodb://localhost/myblog');

var db=mongoose.connection;

db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})

//作者schema
var authorSchema = new mongoose.Schema({
    author: {type: String}, //作者
    avaterUrl: {type: String}, //头像地址
})

//创建model,第三个参数是实际表名
var authorModel = db.model("author", authorSchema, "author");

//内容schema
const contextSchema = new mongoose.Schema({
    blogid: {type: mongoose.Schema.Types.ObjectId, ref: 'author'},//这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。
    title: {type: String}, //标签名
    imgUrl: {type:String}, //背影图片地址
    date: {type: String},  //文章创作日期
    context: {type:String}//文章内容
});

//创建model,第三个参数是实际表名
const contextModel = db.model("context", contextSchema, "context");

/* GET home page */
router.get('/', function(req, res) {
    var pageNum=req.query.page;
    var query=contextModel.find({}).populate('blogid');
    query.limit(4); //限制条数
    query.skip(4*(pageNum-1))   //开始数 ，通过计算可是实现分页
    query.exec(function(err,docs){
         res.send(docs);
    });
	
	
});

export default router;
