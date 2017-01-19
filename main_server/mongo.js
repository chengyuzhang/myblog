
var user=require('../jsonData/user').user;
var article=require('../jsonData/article').article;

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/myblog');
var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.on('connected', function(){
    console.log('Connection success!');
});
db.once('open',function(){
	console.log('mongoose opened!');

	//作者schema
	var authorSchema = new mongoose.Schema({
	    author: {type: String}, //作者
	    avaterUrl: {type: String}, //头像地址
	})

	//创建model,第三个参数是实际表名
	var authorModel = db.model("author", authorSchema, "author");

	//内容schema
	var contextSchema = new mongoose.Schema({
	    blogid: {type: mongoose.Schema.Types.ObjectId, ref: 'author'},//这里即为子表的外键，关联主表。  ref后的blog代表的是主表blog的Model。
	    title: {type: String}, //标签名
	    imgUrl: {type:String}, //背影图片地址
	    date: {type: String},  //文章创作日期
	    context: {type:String}//文章内容
	});

	//创建model,第三个参数是实际表名
	var contextModel = db.model("context", contextSchema, "context");

	//插入作者数据
	for(var i=0; i<user.length; i++){
		(function(index){
			authorModel.create({
			    author: user[i].author, //作者
			    avaterUrl: user[i].avater_url //图片地址
			},function (err,docs) {
				//插入文章数据
				contextModel.create({
					blogid: docs._id, 
					title: article[index].title,
					imgUrl: article[index].img_url,
					date: article[index].date,
					context: article[index].context
				}, function (err, doc) {
					if(err) console.log(err);
					console.log('文章数据插入数据成功');
				})
				console.log('作者数据插入数据成功');
			});
		})(i);
	}

	
	//子表关联主表查询，populate里面为子表外键
	// contextModel.find({}).populate('blogid').exec(function(err,docs){
	//      console.log(docs);
	// })
	
});
