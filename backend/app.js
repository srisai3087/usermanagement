require('dotenv').config();
const express = require('express');
require('./config/dbConfig');
const { apiRouter } = require('./api/v1/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is listing on port 2004`);
});
