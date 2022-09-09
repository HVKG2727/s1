const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();
require('express-async-errors')
const fileUpload = require('express-fileupload')
const path = require('path')

//express
const app = express()

//route
const authRouter = require('./route/authRoute')
const imageRouter = require('./route/imageRoute')
const productRouter = require('./route/productRoute')
const categoryRouter = require('./route/categoryRoute')
const orderRouter = require('./route/orderRoute')

//configuration
app.use(cors());
app.use(cookieParser(process.env.REF_TOKEN_SECRET));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
       // scriptSrcElem: ["'self'", "'unsafe-inline'"],
        //styleSrc: ["'slef'", "'unsafe-inline'"],
        //connectSrc: ['www.googleapis.com'],
        imgSrc: ["'self'", '*.unsplash.com', '*.google.com']
    }
}));
app.use(fileUpload({
    useTempFiles: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/image`, imageRouter)
app.use(`/api/v1/product`, productRouter)
app.use(`/api/v1/category`, categoryRouter)
app.use(`/api/v1/order`, orderRouter)

const PORT = process.env.PORT || 8084;
const connectDB = require('./db')


if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(`client/build`))
    app.use(`*`, (req, res) => {
        res.sendFile(path.join(__dirname + `/client/build/index.html`))
    })
}

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`server is listening on port http://localhost:${PORT}`)
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

start()
