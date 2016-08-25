var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();
var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0');

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8080);

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    port.write(message);
  });
  console.log('started client interval');
  ws.on('close', function() {
    console.log('stopping client interval');
  });
});
