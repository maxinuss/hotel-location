// load .env file config
require('dotenv').config();

const express = require('express');
const router = express.Router();
const app = express();
const routes = require('./routes');

app.listen(process.env.PORT, () => {
    routes.init(app, router);

    console.log(
        `[${Date.now()}][${process.env.ENV}:${process.env.NAME}] [LISTENING:${
            process.env.PORT
        }]`,
    );
});
