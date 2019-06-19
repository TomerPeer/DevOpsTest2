var http = require('http');
var postRequests = 0;

http.createServer( function(request, response) {

   console.log('New Connection');

  switch(request.method){
    case('POST'):
    postRequests++;
        break;
    case('GET'):  
        response.writeHead(200, { 'Content-Type':'text/plain' } );
        response.write('Hello\n');
        response.write('We have had '+postRequests+' POST requests');
        break;
    default:
        break;
  }

  response.end();
}).listen(8080);

console.log('Server Started..');