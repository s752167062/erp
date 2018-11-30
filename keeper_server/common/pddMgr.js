const conf = require("./../conf/config");
const utils = require("./utils");
const mongodbMgr = require("./mongodbMgr");
const netMgr = require("./netMgr");

// 得到一个 eventproxy 的实例
const eventproxy = require("eventproxy");
var ep = new eventproxy();

function pddMgr(){
	
};

pddMgr.prototype.hookDataByID = function(id , callback){
	console.log('>>>>> hookDataByID id : ' + id)
	mongodbMgr.select(conf.keeper, { "goods_id":id } , function(data){
		console.log('>>>> hookDataByID select ')
		if(data && data[0]){
			console.log(data);
			var path = data[0].path;
			netMgr.httpGet(path,function(data){
				if(data){
					callback(data);
				}
			})
		}
	});
};

pddMgr.prototype.hookAll= function(){
	var that = this;
	mongodbMgr.select(conf.keeper, {} , function(list){
		if(list){
			//这里批量操作数据库和网络需要 异步协作
			ep.after('hookAll', list.length, function (topics) {
			  // topics 是个数组，包含了 10 次 ep.emit('hookAll', id) 中的那 10 个 id
			  // 开始行动
			  console.log(">>>>> hookAll after topics :");
			  console.log(topics);
			});

			list.forEach(function(item) {
				var id = item.goods_id;
				that.hookDataByID(id,function(data){
				    if(data){
			            //hook 到数据
			            mongodbMgr.instertRow("t_" + id , data , function(res){
			            	ep.emit('hookAll', id);
			            });   
				    }else{
				    	ep.emit('hookAll', id);
				    }
				});
			});

		}
	});
	
}

pddMgr.prototype.fixkeeper = function(){
	var that = this;
	mongodbMgr.select(conf.keeper, {} , function(list){
		if(list){
			//这里批量操作数据库和网络需要 异步协作
			ep.after('fixkeeper', list.length, function (topics) {
			  // topics 是个数组，包含了 10 次 ep.emit('fixkeeper', id) 中的那 10 个 id
			  // 开始行动
			  console.log(">>>>> fixkeeper after topics :");
			  console.log(topics);
			});

			list.forEach(function(item) {
				var id = item.goods_id;
				that.hookDataByID(id,function(data){
				    if(data){
			            //hook数据 到keeper
			            mongodbMgr.updateRow(conf.keeper , {"goods_id":id } , {"img":data.img , "title":data.title} ,function(result){
			            	ep.emit('fixkeeper', id);
			            });   
				    }else{
				    	ep.emit('fixkeeper', id);
				    }
				});
			});

		}
	});
}

const pddmgr = new pddMgr()
module.exports = pddmgr
