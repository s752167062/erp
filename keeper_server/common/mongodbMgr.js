const conf = require("./../conf/config");
const utils = require("./utils");
const mongoClient = require("mongodb").MongoClient;
var db = null ;
var dbpdd = null;
function mongodbMgr(){
	init();
};

function init(){
	mongoClient.connect(conf.sql, function(err ,db_){
		if (err) {
			console.log(">>> mongo connect db err : " + err);
			return 
		};
		db = db_;
		dbpdd = db_.db(conf.pdd);
	})
};

mongodbMgr.prototype.close = function(){
	if(db){
		db.close();
		db = null;
		dbpdd = null;
	}
};

mongodbMgr.prototype.select = function(table , select, callback){
	var select_ = select;
	if(!select_){
		select_ = {};
	}

	if(dbpdd){
		dbpdd.collection(table).find({}).toArray(function(err, result){
			console.log(">>> mongo select ");
			if (err) {
				console.log(">>> mongo select err : " + err);
				callback();
				return ;
			};

			callback(result);
		});
	}else{
		console.log(">>> mongo select dbpdd null : ");
		init();
	}
};

mongodbMgr.prototype.instertRow = function(table ,data , callback){
	if (!data) {
		console.log(">>> mongo inster data null");
		return 
	};

	if(dbpdd){
		dbpdd.collection(table).insertOne(data , function(err ,res){
			if(err){
				console.log(">>> mongo insert err : " + err);
				callback();
				return ;
			}

			callback(res);
		})
	}else{
		console.log(">>> mongo insert dbpdd null : ");
		init();
	}
}

mongodbMgr.prototype.instertRows = function(table ,data , callback){
	if (!data) {
		console.log(">>> mongo inster data null");
		return 
	};

	if(dbpdd){
		dbpdd.collection(table).insertMany(data , function(err, res){
			if(err){
				console.log(">>> mongo insert err : " +  err);
				callback();
				return ;
			}

			callback(res);
		});
	}else{
		console.log(">>> mongo insert dbpdd null : ");
		init();
	}
}

mongodbMgr.prototype.updateRow = function(table ,select , data ,callback){
	if(!data && !select ){
		console.log(">>> mongo update table data /select null ");
		return 
	}

	if(dbpdd){
		dbpdd.collection(table).updateOne(select , {$set: data} , function(err ,res){
			if(err){
				console.log(">>> mongo update err " + err);
				callback();
				return ;
			}

			callback(res)
		});
	}else{
		console.log(">>> mongo update table dbpdd null ");
		init();
	}
}

mongodbMgr.prototype.updateRows = function(table ,select ,data ,callback){
	if(!data && !select ){
		console.log(">>> mongo update table data /select null ");
		return 
	}

	if(dbpdd){
		dbpdd.collection(table).updateMany(select , {$set: data} , function(err ,res){
			if(err){
				console.log(">>> mongo update err " + err);
				callback();
				return ;
			}

			callback(res)
		});
	}else{
		console.log(">>> mongo update table dbpdd null ");
		init();
	}
}

mongodbMgr.prototype.deleteRow = function(table ,select ,callback){
	if(!select){
		console.log(">>> mongo deleteRow table data select null");
		return;
	}

	if(dbpdd){
		dbpdd.collection(table).deleteOne(select , function(err , res){
			if(err){
				console.log(">>> mongo delete one err :" + err);
				callback();
				return ;
			}

			callback(res);
		})
	}

}

mongodbMgr.prototype.deleteRows = function(table ,select ,callback){
	if(!select){
		console.log(">>> mongo deleteRow table data select null");
		return;
	}

	if(dbpdd){
		dbpdd.collection(table).deleteMany(select , function(err , res){
			if(err){
				console.log(">>> mongo delete one err :" + err);
				callback();
				return ;
			}

			callback(res);
		})
	}

}


mongodbMgr.prototype.createTable = function(name , callback){
	if(!name){
		console.log(">>> mongo create table name null ");
		return 
	}

	if(dbpdd){
		dbpdd.createCollection(name, function(err ,res){
			if(err){
				console.log(">>>> mongo create table err " + err);
				callback();
				return ;
			}

			callback(res);
		});
	}else{
		console.log(">>> mongo create table dbpdd null ; ");
		init();
	}
}

mongodbMgr.prototype.deleteTable = function(name){
	if(!name){
		console.log(">>> mongo create table name null ");
		return 
	}

	if(dbpdd){
		dbpdd.collection(name).drop(function(err ,ok){
			if(err){
				console.log(">>>> mongo delete table err " + err);
				callback();
				return ;
			}

			callback(ok);
		});
	}else{
		console.log(">>> mongo create table dbpdd null ; ");
		init();
	}
}

const mongodbmgr = new mongodbMgr()
module.exports = mongodbmgr
