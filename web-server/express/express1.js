const express = require('express');
const fs = require('fs');
const hostname = 'localhost';
const port = 8000;
const app = express();


app.get('/', function(req,res){
    res.send('Hello');
});
app.get('/about', function(req,res){
 res.send('<div><p>Alina Dmytruk</p> <p>Age: 17</p> <p>University: King Danylo University</p> <p>Major: Software ingineering</p> <p>Group: ІПЗс-22-1</p></div>')
  });
   app.listen(port, function(){
    console.log('running')
})
  app.use((err, req, res,next)=>{
    console.log(err);
    res.status(500).send('error')
  })