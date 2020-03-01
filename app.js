var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.sendFile(__dirname+'/home.html')
}) 

app.get('/contact', function(req, res){
    res.render('contact',{data:{person:req.query.person,department:req.query.department,email:req.query.email}})
})

app.post('/contact',urlencodedParser, function(req, res){
  res.render('contact-success',{data: req.body})
})

app.get('/profile/:name',function(req,res){
    let data = {age:27 , job:'Software Developer', hobbies:['eating','fighting','fishing']}
    res.render('profile',{person:req.params.name,data:data})

});

console.log('Server here, now listening to port 3000');
app.listen(3000);