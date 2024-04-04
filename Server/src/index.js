import app from './app.js'
import logger from "./config/logger.config.js"
import mongoose from 'mongoose'
import {Server} from 'socket.io'
import SocketServer from './SocketServer.js'

//env Variables
// const {DATABASE_URL} = process.env;  
const PORT = process.env.PORT || 8000;


//exit on mongodb error
mongoose.connection.on('error',(err)=>{
    logger.error(`Mongodb connection error: ${err}`);
    process.exit(1);
});

//Mongobd debug mode
// if(process.env.NODE_ENV !=="production") {
//     mongoose.set("debug", true);
// }

// mongodb connection
// mongoose.connect(process.env.DATABASE_URL)
// .then(()=>{
//     logger.info('connected to Mongodb')
// });

mongoose.connect("mongodb://127.0.0.1:27017/PalConnect", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB');
    
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
  });

const server = app.listen(PORT,()=> {
    logger.info(`server is listening on ${PORT}...`);
    // console.log("process id:", process.pid);
    // console.log("process id:", process.ppid); for parent id
    // in the task manager there lots of processes that can be started or stopped...
})
// using the logger created using winston, this replaces console.log

//socket io
const io = new Server(server, {
    pingTimeout: 60000,
    cors:{
        origin: process.env.CLIENT_ENDPOINT,
    },
});

io.on("connection", (socket) => {
    logger.info('socket io connected successfully');
    SocketServer(socket)
});

//handle sever errors
const exitHandler = () => {
    if (server) {
        logger.info('server closed.');
        process.exit(1);
    } else {
        process.exit(1)
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler(); 
}
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM signal termination (terminating gracefully)
process.on("SIGTERM", () => {
    if (server) {
        logger.info("Server closed");
        process.exit(1)
    }
});