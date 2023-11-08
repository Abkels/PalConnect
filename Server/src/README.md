To be able to use impor statements in javascript add "type": "module" to the package.json...like this

"keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",


the cross-env package helps the command npm run dev to run across all systems
so in the start script of the package.json, it should be like this
"scripts": {
    "start": "nodemon ./src/index.js",
    "dev": "cross-env NODE_ENV=development nodemon ./src/index.js"
  } 


Middlewares

the morgan middleware should not be deployed to production hence it should be limited to development. Its a logger that helps you track information on your server

Helmet: helps you secure your express apps by setting your http headers 

express.json: helps to parse json request from body and url

//Body parser (parse json request body)
app.use(express.urlencoded({extended: true}))
app.use(...): This is how you add middleware to your Express.js application. Middleware functions are functions that have access to the request (req) and response (res) objects and can perform tasks in the middle of the request-response cycle.

express.urlencoded(...): express here is the instance of the Express.js application, and urlencoded is middleware that is used to parse incoming request data. The urlencoded middleware is typically used for processing form data submitted in HTML forms.

{ extended: true }: This is an option passed to the urlencoded middleware. The extended option specifies whether to use the "query-string library" (when extended is true) or the "qs library" (when extended is false) for parsing URL-encoded data.

When extended is set to true, it uses the "query-string library" and allows you to send nested objects as data. For example, if you have a form field named "user[name]", with extended set to true, you can receive this data as an object with a nested structure.

When extended is set to false, it uses the "qs library" and treats all data as flat. Nested objects won't be parsed correctly.

Express-mongo-sanitize: sanitizes user-supplied data to prevent MongoDb operator injection...i.e prevents SQL injection attacks

cookie-parser: to parse cookie header and populate req.cookies with object keyed by cookie name

express-file-upload: for uploading files...
when you set useTemplate to b true t helps to create a folder with  name temp... u can use d file and delete wen not needed.

cors middleware: to protect and to restrict access to the server

compression middleware helps to compress data which makes response faster.

PROCESSES in the uncaught exception
process.exit(1) means there is an error, (0) means no error
//// in the task manager there lots of processes that can be started or stopped...
typing the ps command in the terminal displays lots of processes in  the system
cconsole.log(process.pid or ppid) will print the id of the process in the console.

if you want to kill it, you can go to command promt and type the following command
 taskkill /pid 1852/f   this will kill the process and crash your server. So it is adviced to close the server before it crashes...

 ...create the routes.
 inside the routes folder create an index.js file to create a global router

 "http-errorr": for handling http status codes properly

 trim-request for emoving white spaces in the req.body

 regexr.com helps you with REGEX and explains what it does