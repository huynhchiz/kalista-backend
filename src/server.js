import dotenv from 'dotenv'
import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import initApiRoutes from "./routes/api";
import configCors from "./config/configCors";

const fileUpload = require('express-fileupload');

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

// config CORS
configCors(app);

app.use(fileUpload())

// config body-parser
app.use(bodyParser.urlencoded({ extended: true, limit: "25mb" }));
app.use(bodyParser.json({ limit: "25mb" }));

// config cookie parser
app.use(cookieParser());

// set limit url image
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

initApiRoutes(app)

app.use((req, res) => {
    res.send('404 not found!')
})

app.listen(PORT, () => {
    console.log(`kalista-backend listening on port ${PORT}`);
})
