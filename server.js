var express = require('express');
var http = require("http");
var path = require("path");
var debug = require('debug')('rainbow:server');

var exServer = express();

exServer.set('port', '2000');

var routes = require('./server/router.js');
exServer.use('/ui', express.static(path.join(__dirname, 'client')));
exServer.use('/ui/*', function(req,res) { res.sendFile('index.html', { root: path.join(__dirname, 'client') }); })
exServer.use('/api', routes);

var server = http.createServer(exServer);

server.listen(exServer.get('port'), function(){
  console.log('Express server listening on port ' + exServer.get('port'));
});

server.on('error', function(error){
	if (error.syscall !== 'listen') {
    throw error;
  }
	
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + exServer.get('port') + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + exServer.get('port') + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }	
});

server.on('listening', function(){
	var addr = server.address();
  	var bind = 'port ' + addr.port;
  	debug('Listening on ' + bind);
});

