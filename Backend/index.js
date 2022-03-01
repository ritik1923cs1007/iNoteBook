
const ConnectToMongo=require('./db');

const express = require('express');
var cors = require('cors')
const app = express();
const port=5000;
  ConnectToMongo();
app.use(express.json());
app.use(cors());
  //available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/note',require('./routes/note'));
app.get('/', (req, res) => {
    res.send('Hello Ritik!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })