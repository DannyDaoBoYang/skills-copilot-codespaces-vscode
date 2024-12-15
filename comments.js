//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var port = 8080;

// Create a server
http.createServer( function (request, response) {  
   var pathname = url.parse(request.url).pathname;
   console.log(pathname);
   var filename = path.join(process.cwd(), pathname);
   console.log(filename);
   fs.exists(filename, function(exists) {  
      if(!exists) {  
         response.writeHead(404, {"Content-Type": "text/plain"});  
         response.write("404 Not Found\n");  
         response.end();  
         return;  
      }  
      fs.readFile(filename, "binary", function(err, file) {  
         if(err) {  
            response.writeHead(500, {"Content-Type": "text/plain"});  
            response.write(err + "\n");  
            response.end();  
            return;  
         }  
         response.writeHead(200);  
         response.write(file, "binary");  
         response.end();  
      });  
   });  
}).listen(port);  
console.log("Server running at http://localhost:" + port + "/");