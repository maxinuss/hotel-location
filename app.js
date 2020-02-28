// load .env file config
require('dotenv').config();

const routes = require('./routes');
const express = require('express');
const router = express.Router();
const app = express();

app.listen(process.env.PORT, () => {
    routes.init(app, express, router);

    console.log(
        `[${Date.now()}][${process.env.ENV}:${process.env.NAME}] [LISTENING:${
            process.env.PORT
        }]`,
    );
});
