// import something from 'someaknsbahjs'
// import io from '/socket.io/socket.io.js'
const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
let todos = [];

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// for get request
app.get('/', function(req, res){
  res.send('Hilu Gudmorning');
});
// for post request
app.post('/posts', function(req, res){
  var id = req.body.id
  console.log(id)
  res.json(id);
});
app.get('/users/:userID', (req, res) => {
  // SELECT * FROM USERS WHERE USERID = req.params.userID
  var id = req.params.userID
  console.log(req.params.userID)
  res.send('The user id is: ' + id);
})

io.on('connection', function (socket) {
  console.log('a user connected! ' + socket.id)
  socket.on('add_todo', function (data) {
    console.log(data);
    todos.push(data);
    io.emit('get_todos', todos);
  });
  socket.on('update_todo', (data) => {
    console.log(data)
    todos[data.id] = data.text
    io.emit('get_todos', todos);
  })
  socket.on('delete_todo', (data) => {
    console.log(data)
    todos.splice(data, 1)
    io.emit('get_todos', todos);
  })
});

server.listen(port);