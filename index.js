const express = require('express');
const router = require('./src/routes/routes');
const port = 4000;
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors({
  origin:'*'
}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

