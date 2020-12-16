// npm install dotenv than add below line
require("dotenv").config();
// npm install express then add below line
const express = require("express");
const logger = require("./middleware/logger");

// app initialize
app = express();

// needs to accept Content-Type application/json
// log in console in a proper way
app.use(logger);

// json receiver middleware
app.use(express.json());

// form data receiver middleware
app.use(express.urlencoded({ extended: true }));

port = process.env.port; // || 3000;
host = process.env.host; // || "192.168.1.21";

// added for elastic search client
app.use("/es/client", require("./routes/client/"));
// added for elastic search api
app.use("/es/api", require("./routes/api/"));

// app listening on a pre defined port and host from env
app.listen(port, host, () => console.log(`server running on port:${port}`));

// cant export express because it executes later and other files
//which u import executes before it export
// module.exports = app;
