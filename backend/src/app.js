const express = require ("express");
const routes = require("./routes");
const { errors } = require ('celebrate')
const cors =require('cors');

const App = express();

App.use(cors());
App.use(express.json());
App.use(routes);
App.use(errors());



module.exports = App;