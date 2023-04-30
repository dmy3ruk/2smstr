const fs = require('fs');
const events = require('events');
const nodemailer = require('nodemailer');
const eventEmitter = new events.EventEmitter();

// Event 1
eventEmitter.on('getTemperatureData', (date, temperature) => {
  if (!date || !temperature || isNaN(temperature)) {
    throw new Error('Invalid date or temperature');
  }
  const data = { date, temperature };
  fs.writeFile('temperatureData.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Temperature data saved to file');
  });
});

// Event 2
eventEmitter.on('calculateAverageTemperature', (date) => {
  if (!date) {
    throw new Error('Invalid date');
  }
  fs.readFile('temperatureData.json', (err, data) => {
    if (err) throw err;
    const temperatureData = JSON.parse(data);
    const filteredData = temperatureData.filter((item) => item.date === date)
    const sum = filteredData.reduce((acc, item) => acc + item.temperature, 0);
    const averageTemperature = sum / filteredData.length;

    console.log(`The average temperature for ${date} is ${averageTemperature} degrees Celsius`);
    eventEmitter.emit('sendEmail', date, averageTemperature);
    });
   });

// Event 3
eventEmitter.on('checkTemperature', (date, temperature) => {
  if (temperature > 30) {
    console.log(`The temperature on ${date} is above 30 degrees Celsius`);
  }
});

// Event 4
eventEmitter.on('sendEmail', (date, averageTemperature) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: 'recipient_email@gmail.com',
      subject: `Average Temperature for ${date}`,
      text: `The average temperature for ${date} is ${averageTemperature} degrees Celsius`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log(`Email sent: ${info.response}`);
    });
  } catch (err) {
    console.error(err);
  }
});

eventEmitter.emit('getTemperatureData', '2022-01-01', 28);
eventEmitter.emit('calculateAverageTemperature', '2022-01-01');
eventEmitter.emit('checkTemperature', '2022-01-01', 25);
