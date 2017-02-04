require('./config/config');

const express = require('express');


const path = require('path');

const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/..public'); The way its done now using the path node module
// console.log(publicPath);  The way things were done before

var app = express();
const port = process.env.PORT;

app.use(express.static(publicPath) );

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})


module.exports = {app};
