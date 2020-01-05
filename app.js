var http= require('http');
var fs = require('fs')

var server = http.createServer(function(req,res){
    console.log("Request was made: "+req.url)
    if(req.url ==='/home' || req.url === '/'){
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream(__dirname + '/Home.html').pipe(res)
    }else if(req.url ==='/contact'){
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream(__dirname + '/Contact.html').pipe(res)
    } else if(req.url ==='/api/details'){
        res.writeHead(200,{'Content-Type':'application/json'})
        var jsonData = [{name:'Sagar',location:'Pune'},{name:'John',location:'western'}]
        res.end(JSON.stringify(jsonData))
    } else {
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream(__dirname + '/404.html').pipe(res)
    }
   // res.end('Hey client')
})

server.listen(3002,'127.0.0.1');
console.log('Server here, now listening to port 3001');