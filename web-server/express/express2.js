const express = require('express');
const fs = require('fs');
const hostname = 'localhost';
const port = 8000;
const app = express();

 app.use(express.static('public'));
app.get('/', function(req,res){
    res.send('Hello');
}); 
app.get('/about', function(req,res){
  fs.readFile('./student.html', (err, data)=>{
    if(err){
      res.writeHead(500, {'Content-Type':'text/html'})
      res.write('error');
      res.end();
    } else {            
      res.writeHead(200,{ 'Content-Type':'text/html'  });            
      res.write(data);            
      res.end();       
    }    
  });
})
    app.listen(port, function(){
    console.log('running')
})
  app.use((err, req, res,next)=>{
    console.log(err);
    res.status(500).send('error')
  })