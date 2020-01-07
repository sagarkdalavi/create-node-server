var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send("This is the homepage")
}) 

app.get('/contact', function(req, res){
    res.send("This is the contact page")
})

app.get('/profile/:id', function(req, res){
    res.send("You requested to see the profile with the id of " + req.params.id)
})

console.log('Server here, now listening to port 3000');
app.listen(3000);