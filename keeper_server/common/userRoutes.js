//用户协议相关
//负责处理用户登录，注册，修改密码，修改用户信息，获取用户信息 等操作
//需要做cookie和session

const userMgr = require("./../base/userMgr");

function login(req ,res){

}

function register(req, res){

}

function changePass(req ,res){

}

function changeUserInfo(req ,res){

}

function getUserInfo(req ,res){

}

function addGoods(req ,res){

}

function deleGoods(req ,res){

}

function addMall(req ,res){

}

function deleMall(req ,res){

}

module.exports = function(app){
    if(app){
        //监听接口
        app.get("/login", login);
        app.get("/register", register);
        app.get("/changePass", changePass);
        app.get("/changeUserInfo", changeUserInfo);
        app.get("/getUserInfo", getUserInfo);

        app.get("/addGoods", addGoods);
        app.get("/deleGoods", deleGoods);
        app.get("/addMall", addMall);
        app.get("/deleMall", deleMall);
    }
}
