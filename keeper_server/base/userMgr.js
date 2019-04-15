//用户管理
//负责处理用户登录，注册，修改密码，修改用户信息，获取用户信息 ， 用户列表 等操作

var userList = {};

function userMgr(){
	
};

userMgr.prototype.userlogin = function(account, passw ,callback){

} 

userMgr.prototype.userRegist = function(account , passw , callback){

}

userMgr.prototype.userChangePass = function(account , oldpass, newpass , callback){

}

userMgr.prototype.userChangeUserInfo = function(account , info , callback){

}

userMgr.prototype.userAddGoods = function(account , id , callback){

}

userMgr.prototype.userDeleGoods = function(account , id , callback){

}

userMgr.prototype.userAddMall = function(account , info , callback){

}

userMgr.prototype.userDeleMall = function(account , info , callback){

}

//获取内存表中的用户数据
userMgr.prototype.getUserInfo = function(account){

}

userMgr.prototype.checkUserLevel = function(account){

}

userMgr.prototype.userCheck = function(cookie ,session){
	return account ;
}

//后期需要进一步的订单较验
userMgr.prototype.userLevelUp = function(account , newlevel , timelimit , callback){

}


const usermgr = new userMgr()
module.exports = usermgr
