var http  = require("http");

var fs = require("fs");
fs.readFile('input.txt', function(err, data) {

	if (err) return console.error(err);
	console.log(data.toString());

});

http.createServer(function (request, response) {

	response.writeHead(200, {'Content-Type' : 'text/plain'})

	response.end(data + '\n');

}).listen(8081);


console.log('Server running at http://127.0.0.1:8081/');
