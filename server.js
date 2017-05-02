var express = require('express');

var app = express();

var fs = require('fs');

var bodyParser = require('body-parser');

var server = app.listen(8000, '0.0.0.0', function(){
  console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);
console.log('We are connected');

io.sockets.on('connection', function(socket){
  socket.on("user_submit", function (data){
      socket.emit('server_response', {response: data});
  });
  socket.on("message_submit", function (data){
      io.emit('server_message', {responses: data});
  });
  console.log(socket.id);
});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){
  if(request.url === '/'){
  fs.readFile('./views/index.ejs', 'utf8', function (errors, contents){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(contents);
    response.end();
    });
  }
})

app.use(express.static(__dirname + '/static'));
console.log(__dirname);

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.get("/users/:id", function (req, res){
  console.log("POST DATA \n\n", req.body)
  res.redirect('/')
});
