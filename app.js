const express = require('express');
const app = express();

const port = 3000;

const router = require('./src/route.js');

app.use('/', router);

app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});