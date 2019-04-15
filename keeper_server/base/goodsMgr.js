//商品管理类 处理的是全平台的商品

var goodstable = {}

function goodsMgr(){
	
};

//读取商品数据总表
goodsMgr.prototype.readGoodsDataBase = function(){

}

//数据商品表中的数据创建商品对象
goodsMgr.prototype.makeMallDataByID = function(goodsid) {
	
};

//检查商品数据总表 是否包含 商品
goodsMgr.prototype.checkGoods = function(goodsid){

} 

//检查商品数据总表 是否包含 商品
goodsMgr.prototype.addGoods = function(goodsid, callback){

}

//删除分两种， 一种是用户监听的删除， 一种是总表的删除
goodsMgr.prototype.deleGoods = function(goodsid, callback){

}

//爬全部商品数据
goodsMgr.prototype.hookAllGoodsData = function() {
	
};

//解析html提取数据段
goodsMgr.prototype.decodeHookData = function(str) {
	
};

goodsMgr.prototype.getGoodsByID = function(goodsid) {
	
};

//定时清除无用的数据表
goodsMgr.prototype.cleanUseless = function() {
	
};

const goodsmgr = new goodsMgr()
module.exports = goodsmgr