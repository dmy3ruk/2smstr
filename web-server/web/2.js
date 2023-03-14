const http = require('http'); 
const hostname = 'localhost'; 
const fs = require('fs'); 
const port = 8000; 
const server = http.createServer(function (req, res){ 
    fs.readFile('./student.html', (err,data)=>{         
        if (err){             
            res.writeHead(500, {'Content-Type': 'text/html'}); 
            res.write('error');            
            res.end(); 
        } else {            
            res.writeHead(200,{ 'Content-Type':'text/html'  });            
            res.write(data);            
            res.end();       
          }    
         }); 
        }); 
 server.listen(port, function(){     
     console.log('running'); 
});