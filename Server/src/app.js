import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import createHttpError from 'http-errors'
import routes from "./routes/index.js"


//dotEnv config
dotenv.config();

//create express app
const app = express();

// morgan
if(process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'));
}

//Helmet
app.use(helmet());

//Body parser (parse json request body)
app.use(express.urlencoded({extended: true}));

//sanitize request data
app.use(mongoSanitize()); 

//Enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//adding fileupload
app.use(fileUpload({
    useTempFiles: true
}))

//cors
app.use(cors());

app.use("api/v1", routes)

app.post('/test', (req, res) => {
    // res.send("hello from here")
    throw createHttpError.BadRequest('this route has an error')
})

app.use(async(req,res,next) => {
    next(createHttpError.NotFound("this route does not exist"))
})

// Error handling
app.use(async(err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

export default app

 