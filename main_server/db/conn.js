import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/myblog');

var db=mongoose.connection;
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})
db.on('error', console.error.bind(console, '连接错误'));
export default db;
