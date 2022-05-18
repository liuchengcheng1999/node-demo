var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\n=node server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/'){ // 这个是发起请求和读取请求的路径
    response.statusCode = 200 //状态码：用ifelse判断，如果成功返回200
    response.setHeader('Content-Type', 'text/html;charset=utf-8') // content-type表示内容的类型和语法
    response.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/x">
      </head>
      <body>
        <h1>标题</h1>
        <script src="/y"></script>
      </body>
    </html>
    `); // 可以填写返回的内容
    response.end(); // 表示相应可以发送给用户
  } else if(path === '/x'){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css;charset=utf-8');
    response.write(`body{color: red;}`);
    response.end();
  } else if (path === '/y'){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/javascript;charset=uft-8');
    response.write(`console.log('这是js内容')`);
    response.end();
  }else {
    response.statusCode = 404; // 如果失败则返回404
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

