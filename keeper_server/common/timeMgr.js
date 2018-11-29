const conf = require("./../conf/config")
const utils = require("./utils")
const pddMgr = require("./pddMgr");

var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
rule.minute = 0;
rule.second = 0
function timeMgr(){
	var ti = schedule.scheduleJob(rule,function(){
		console.log(">>>> time to hook !!");
		pddMgr.hookAll();
	})
};

const timer = new timeMgr()
module.exports = timer
