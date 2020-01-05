var http= require('http');

var server = http.createServer(function(req,res){
    console.log("Request was made: "+req.url)
    res.writeHead(200,{'Content-Type':'application/json'})
    var myObj ={
        name: "Sagar",
        location: "Pune",
        designation: "Software Engineer"
    }
    res.end(JSON.stringify(myObj))
})

server.listen(3001,'127.0.0.1');
console.log('Server here, now listening to port 3001');