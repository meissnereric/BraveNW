const express = require('express');
const serveIndex = require('serve-index');

const kafka = require('./kafka.js');

id = 'KafkerJSApp'
brokerAddress = ['localhost:9092']
topic = 'testJSTopic'
messages = [
    { value: 'Hello KafkaJS user!' },
  ]
consumerGroup = 'testJSGroup'

kafka.start(id, brokerAddress, topic, messages, consumerGroup)

const app = express();


app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.use('/nav', express.static('nav'));

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
