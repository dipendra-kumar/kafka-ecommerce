const express = require('express')
const proxy = require("express-proxy-handler")

const app = express();

app.use('/users', proxy("http://localhost:4003"));
app.use('/orders', proxy("http://localhost:7002"));
app.use('/', proxy("http://localhost:4001"));


app.listen(4000, console.log("Server started and listening on port 4000"))