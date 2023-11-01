import app from './app.js'
import logger from "./config/logger.config.js"

const PORT = process.env.PORT || 8000


app.listen(PORT,()=> {
    logger.info(`server is listening on ${PORT}`)
})
// using the logger created using winston, this replaces console.log
