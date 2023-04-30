
const https = require('https');
const zlib = require('zlib');
const MongoClient = require('mongodb').MongoClient;
const mongoURI = "mongodb+srv://dmy3ruik:1240@cluster0.qpyfk5g.mongodb.net/?retryWrites=true&w=majority";
const url='https://popwatch-staging.s3.us-east-2.amazonaws.com/movies_1.gz'
const dbName='cluster0'
const collection='movie'
function downloadAndParseMovies(url, dbName, collectionName, mongoURI) {

  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Connected to MongoDB server");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    https.get(url, (res) => {
      const gunzip = zlib.createGunzip();
      res.pipe(gunzip);

      const lineReader = require('readline').createInterface({
        input: gunzip
      });
      lineReader.on('line', (line) => {
        const movie = JSON.parse(line);
        collection.insertOne(movie, (err, result) => {
          if (err) {
            console.error(err);
          }
        });
      });
      lineReader.on('close', () => {
        console.log("Finished parsing and inserting movies");
        client.close();
      });
    });
  });
}