const https = require('https');
const fs = require('fs');


const fileUrl = 'https://github.com/4nth0nyl1MHC/UK-Scanning-Directory-2019/blob/77136ccadea675af2345a40a0287f93ebe40e51f/UK%20Scanning%20Directory%20-%20January%202019/Various%20Misc%20Files/UK%20Airports%202019%20(VHF%20%26%20UHF)/London%20Swanwick%20Control%202017.txt';


https.get(fileUrl, (response) => {
  let data = '';


  // Concatenate chunks of data
  response.on('data', (chunk) => {
    data += chunk;
  });


  response.on('end', () => {
    // Save file locally
    fs.writeFile('file.txt', data, (err) => {
      if (err) throw err;
      console.log('File saved!');


  // Count lines in the file
  const fileContent = fs.readFileSync('file.txt', 'utf-8');
  const linesCount = fileContent.split(/\r\n|\r|\n/).length;
  console.log(`The number of lines in the file is: ${linesCount}`);
  
  // Reverse file content
  const reversedData = fileContent.split('').reverse().join('');
  // Save reversed file locally
  fs.writeFile('file-reversed.txt', reversedData, (err) => {
    if (err) throw err;
    console.log('Reversed file saved!');
  });
});    

  });
}); 