import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import initApiRoutes from "./routes/api";

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

// config body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config cookie parser
app.use(cookieParser());

initApiRoutes(app)

app.use((req, res) => {
    res.send('404 not found!')
})


app.listen(PORT, () => {
    console.log(`kalista-backend listening on port ${PORT}`);
})
