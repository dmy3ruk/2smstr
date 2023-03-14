const http = require('http');
const hostname = 'localhost';
const port = 8000;
const server = http.createServer(
    function (req, res){
        res.writeHead(200,{
            'Content-Type':'text/plain'
        });
        res.end('Velaris, the city of starlight')
    });
server.listen(port, function(){
    console.log('running');
});