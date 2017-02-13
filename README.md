# myblog

这是一个react结合redux以及mongodb来进行服务端渲染的例子。

####运行方法:
首先要安装mongodB 并开启服务并npm install
######1.npm run mongo
此为初始化数据，往mongodb里插入示例数据，在整个项目中只运行一次即可<br/>
######3.npm run server
这是模仿实际项目中的后台服务器，因为涉及到服务端渲染，所以这个项目中有两个服务器，此为第一个
######2.npm start
这是第二个服务器，即前端用服务器，这里有服务端渲染代码<br/>
访问 http://localhost:3000
