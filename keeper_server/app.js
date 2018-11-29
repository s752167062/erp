var express = require("express");
var app = express();

var conf = require("./conf/config");

var pddRoutes = require("./common/pddRoutes");
pddRoutes(app);

var timeMgr = require("./common/timeMgr");

app.listen(16888, function () {
  	console.log('版本服务启动 : 16888');
});

app.use(express.static("./../pddlistener"))


module.export = app;