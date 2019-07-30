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
        response.write('Deployment at progress...\n');
        response.write('');
        break;
    default:
        break;
  }

  response.end();
}).listen(3000);

console.log('Server Started..');