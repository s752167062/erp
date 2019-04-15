//商店管理类 处理的是全平台的商店

var mallstable = {}

function mallMgr(){
	
};

//读取商店数据总表
mallMgr.prototype.readMallDataBase = function(){

}

//数据商品表中的数据创建商店对象
mallMgr.prototype.makeMallDataByID = function(goodsid) {
	
};

//检查商店数据总表 是否包含 商店
mallMgr.prototype.checkMall = function(mallid){

} 

//检查商店数据总表 是否包含 商店
mallMgr.prototype.addMall = function(mallid, callback){

}

//删除分两种， 一种是用户监听的删除， 一种是总表的删除
mallMgr.prototype.deleMall = function(mallid, callback){

}

//爬全部商店数据
mallMgr.prototype.hookAllMallData = function() {
	
};

//解析html提取数据段
mallMgr.prototype.decodeHookData = function(str) {
	
};

mallMgr.prototype.getMallByID = function(mallid) {
	
};

//定时清除无用的数据表
mallMgr.prototype.cleanUseless = function() {
	
};


const mallmgr = new mallMgr()
module.exports = mallmgr