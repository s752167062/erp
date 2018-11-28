const conf = require("./../conf/config");
const utils = require("./utils");
const mongodbMgr = require("./mongodbMgr");
const netMgr = require("./netMgr");

function pddMgr(){
	
};

pddMgr.prototype.hookDataByID = function(id , callback){
	mongodbMgr.select(conf.keeper, { goods_id:id } , function(data){
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
	mongodbMgr.select(conf.keeper, {} , function(list){
		if(list){
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				var id = item.goods_id;

				pddMgr.hookDataByID(id,function(data){
			        if(data){
			            //hook 到数据
			            mongodbMgr.instertRow(id , data , function(res){
			            	
			            })    
			        }
			    })
			};
		}
	});
	
}

const pddmgr = new pddMgr()
module.exports = pddmgr
