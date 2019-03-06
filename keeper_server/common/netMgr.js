const conf = require("./../conf/config")
const utils = require("./utils")
const mongodbMgr = require("./mongodbMgr");

var request = require("request");
var cheerio = require("cheerio");

function netMgr(){
	
};

netMgr.prototype.httpGet = function(path, callback){
	console.log(">>>>  httpGet " + path );
	request(path , function(error, respones , body){
		if(!error && respones.statusCode == 200){
			// console.log(">>>> body" + body);
			var $ = cheerio.load(body);
			// console.log($);
			//jquery 获取节点内容
			var number = $(conf.number).text();
			var price  = $(conf.price).text();
			var img    = $(conf.img).attr('src');
			var title  = $(conf.title).text();
			var pingjia= $(conf.pingjia).text();
			var coupon = $(conf.coupon).text();
			var kaituan= $(conf.kaituan).text();

			if(img){
				var end_ = "?"
			    var end = img.indexOf(end_);
			    if(end > 1){
			        var url = img.substring(0, end)
			        img = "https:" + url;
			    }
			}

			var data = {};
			data.number = number;
			data.price  = price;
			data.title  = title;
			data.img    = img;
			data.pingjia= pingjia;
			data.coupon = coupon;
			data.kaituan= kaituan;
			data.times  = new Date().format("yyyy-MM-dd hh:mm:ss");  

			console.log(data);
			callback(data);
		}
	})
};

netMgr.prototype.httpGetMall = function(path,callback){
	console.log(">>>>  httpGetMall " + path );
	request(path , function(error, respones , body){
		if(!error && respones.statusCode == 200){
			console.log(">>>> body" + body);
			// var $ = cheerio.load(body);
			// // console.log($);
			// //jquery 获取节点内容
			// var number = $(conf.number).text();
			// var price  = $(conf.price).text();
			// var img    = $(conf.img).attr('src');
			// var title  = $(conf.title).text();
			// var pingjia= $(conf.pingjia).text();
			// var coupon = $(conf.coupon).text();
			// var kaituan= $(conf.kaituan).text();

			// if(img){
			// 	var end_ = "?"
			//     var end = img.indexOf(end_);
			//     if(end > 1){
			//         var url = img.substring(0, end)
			//         img = "https:" + url;
			//     }
			// }

			// var data = {};
			// data.number = number;
			// data.price  = price;
			// data.title  = title;
			// data.img    = img;
			// data.pingjia= pingjia;
			// data.coupon = coupon;
			// data.kaituan= kaituan;
			// data.times  = new Date().format("yyyy-MM-dd hh:mm:ss");  

			// console.log(data);
			// callback(data);
		}
	})
}

const netmgr = new netMgr()
module.exports = netmgr
