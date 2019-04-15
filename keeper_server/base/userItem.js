//用户类
class user{
	constructor(){
		this.account = "",
		this.passworld = "",
		this.level = "",
		this.registered_time = "",
		this.userId = "",
		this.timelimit = "",
		this.goodslist = {},
		this.malllist = {},
		this.address = "",
		this.ip = "",
		this.environment = ""
	}

	setAccount(account){
		this.account = account;
	}

	getAccount(){
		return this.account
	}

	setPassWorld(passw){
		this.passworld = passw;
	}

	getPassWorld(){
		return this.passworld
	}

	setLevel(level){
		this.level = level;
	}

	getLevel(){
		return this.level;
	}

	setRegisteredTime(rtime){
		this.registered_time = rtime
	}

	getRegisteredTime(){
		return this.registered_time;
	}

	setUserID(id){
		this.userId = id;
	}

	getUserID(){
		return this.userId;
	}

	setTimeLimit(ltime){
		this.timelimit = ltime;
	}

	getTimeLimit(){
		return this.timelimit;
	}

	addGoods(goodsid){

	}

	deleGoods(goodsid){

	}

	addMall(mallid){

	}

	deleMall(mallid){

	}

	setIP(ip){
		this.ip = ip;
	}


	getIP(){
		return this.ip
	}

	setEnvironment(env){
		this.environment = env;
	}

	getEnvironment(){
		return this.environment;
	}

	setGoodsExt(goodsid , str){

	}

	getGoodsExt(goodsid){

	}

	setMallExt(mallid , str){

	}

	getMallExt(mallid){

	}
}

module.exports = user;
