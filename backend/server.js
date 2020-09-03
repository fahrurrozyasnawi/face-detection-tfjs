const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());

