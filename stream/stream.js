const fs=require('fs');
const { Transform } = require('stream');
const fStream=fs.createReadStream('koa.txt', 'utf8' )
let i=0;
fStream.on('data', (chunk)=>{
    const words = chunk.split(/\s+/);
    i+=words.length;
    
})
fStream.on('end', ()=>{
    console.log('Word count:', i);
})