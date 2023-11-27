const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(express.static('./public'));

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const videos = require('./routes/videos');

app.use('/videos', videos);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})