//imports
const express = require("express");
const aktorlerRouter = require('./routers/aktorlerRouter')
const logger = require('./middlewares/logger')
const errorHandling = require('./middlewares/errorHandling')


const server = express();
//middleware
server.use(express.json())//kullanıcıdan gelen verileri jsona çevir. Bu bir middleware.
server.use(logger)
server.use("/aktorler", aktorlerRouter)


server.get("/", (req, res) => {
  res.send("Expres'ten Merhaba.");
});

//middleware
server.use(errorHandling)

server.listen(5000, () => {
  console.log("http://localhost:5000 adresine gelen istekler dinleniyor.");
});
