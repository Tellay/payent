require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/api/products', require('./routes/products'));

app.listen(PORT || 3001, () => console.log(`API running at http://localhost:${PORT}.`));