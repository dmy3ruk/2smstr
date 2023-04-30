const EventEmitter =require('events');
const fs = require('fs')
const event=new EventEmitter('DataAndTemperature', function (temperature, data){
 fs.writeFile('file.json', temperature, data, (err)=>{
    if(err) throw err;
    console.log('data and temperature was saved to the file ')
 }) 
})
event.emit('DataAndTemperature', '32', '10.12')