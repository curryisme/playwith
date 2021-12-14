
var users = require('./routes/users');
var peiwan = require('./routes/peiwan');
var order = require('./routes/order');
const multer = require('multer')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use('/public', express.static('public'));
app.use('/', express.static('html'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// app.use('/napi/users', users);
// app.use('/napi/peiwan', peiwan);
// app.use('/napi/order', order);
app.use('/users', users);
app.use('/peiwan', peiwan);
app.use('/order', order);
var storage = multer.diskStorage({
  //确定图片存储的位置
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});
var upload = multer({ storage: storage });
//接收上传图片请求的接口
app.post('/napi/upload', upload.single('file'), function (req, res, next) {
  //图片已经被放入到服务器里,且req也已经被upload中间件给处理好了（加上了file等信息）
  //线上的也就是服务器中的图片的绝对地址
  var url = 'http://localhost:3001/public/upload/' + req.file.filename
  res.json({
    success: true,
    data: url
  })
});
// app.use('/angular', express.static(__dirname + '/node_modules/angular'));
//配置服务端口
var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('服务 app listening at http://localhost:3001', host, port);
})
