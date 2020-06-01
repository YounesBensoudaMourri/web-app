"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require('path');

let api = express.Router();

module.exports = (app) => {
   app.set("json spaces", 2);
   app.use("/api", api);
};

api.use(cors());
api.use(bodyParser.json());

/*This allows the routing to have access to the css files when redirecting different files */
api.use(express.static(path.join(__dirname, "../public/user")));
        
        
api.get("/", (req, res) => {
   console.log('get being called');
   console.log('the path name is', path.join(__dirname, "./user/user.html"))
   /* this is how you load a new file*/
   res.sendFile(path.join(__dirname, "../public/user/user.html"))

//   res.json({
//      success: true
//   });
});
