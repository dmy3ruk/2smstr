const fs=require('fs');
const { Transform } = require('stream');
const fStream=fs.createReadStream('koa.txt', 'utf8')
let i=0;
fStream.on('data', (chunk)=>{
    console.log(chunk.toString())
})
fStream.on('end', ()=>{
    console.log('File read seccesfully');
})