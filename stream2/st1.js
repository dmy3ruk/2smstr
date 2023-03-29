const fs=require('fs');
const { Transform } = require('stream');
const fStream=fs.createReadStream('acotar.txt', 'utf8')
const capitalizeFirst = new Transform({
    transform(chunk, encoding, callback) {
        let capitalizedChunk = '';
        let words = chunk.toString().split(' ');
        for(let i = 0; i < words.length; i++) {
            let word = words[i];
            capitalizedChunk += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
        }
        this.push(capitalizedChunk);
        callback();
    }
});
const wStream = fs.createWriteStream('acotar1.txt', 'utf8');
fStream.pipe(capitalizeFirst).pipe(wStream);
  