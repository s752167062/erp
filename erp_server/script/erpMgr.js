
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const fs = require("fs");
const conf = require("./../conf/config")

function initSkuList(){
    console.log(conf)
    var data = fs.readFileSync(conf.skuInfo);
    this.skulist = JSON.parse(data.toString()); 
}

function getSkuList(req,res,next){
    var list = [];
    if(this.skulist){
        list = this.skulist
    }

    res.send(JSON.stringify(list)); 
}

function onDailyUse(req,res,next){
    var body =req.body;
    console.log(body);

    var admoney = body.admoney;
    var orderlist = body.orderlist;
    var fakelist = body.fakelist;
    
}

function onEditExp(req,res,next){
    var body =req.body;
    console.log(body);

    var exp_id = body.exp_id;
    var exp_num = body.exp_num;
    var exp_money = body.exp_money;

}

function onAddSku(req,res,next){
    var body =req.body;
    console.log(body);

    var sku_id  = body.sku_id;
    var sku_name= body.sku_name;
    var sku_num = body.sku_num;
    var sku_baseMoney = body.sku_baseMoney;
    var sku_sellMoney = body.sku_sellMoney;

    var data ={};
    data.id = sku_id;
    data.name = sku_name;
    data.number = sku_num;
    data.baseMoney = sku_baseMoney;
    data.sellMoney = sku_sellMoney;

    if(this.skulist){
        for (var i = 0; i < skulist.length; i++) {
            var item = skulist[i];
            if(item.id == sku_id){
                res.send(JSON.stringify({ code:2 , msg:"sku exit" }})); 
                return
            }
        };

        this.skulist.push(data)
        res.send(JSON.stringify({ code:1 , msg:"success" }})); 
        
        //save 
        var str = JSON.stringify(this.skulist)
        fs.writeFileSync(conf.skuInfo,str);
        return 
    }

    res.send(JSON.stringify({ code:0 , msg:"nil skulist" }})); 
}

function onEditSku(req,res,next){
    var body =req.body;
    console.log(body);

    var sku_id  = body.sku_id;
    var sku_num = body.sku_num;
    var sku_baseMoney = body.sku_baseMoney;
    var sku_sellMoney = body.sku_sellMoney;

    if(this.skulist){
        for (var i = 0; i < skulist.length; i++) {
            var item = skulist[i];
            if(item.id == sku_id){
                skulist[i].number = sku_num;
                skulist[i].baseMoney = sku_baseMoney;
                skulist[i].sellMoney = sku_sellMoney;

                //save 
                var str = JSON.stringify(this.skulist);
                fs.writeFileSync(conf.skuInfo,str);
                res.send(JSON.stringify({ code:1 , msg:"success" }})); 
                return
            }
        };
    }

    res.send(JSON.stringify({ code:0 , msg:"nil skulist" }})); 
}


module.exports = function(app){
    //init list

    if(app){
        app.get("/skulist", getSkuList); 
        app.post("/dailyuse" , multipartMiddleware , onDailyUse);
        app.post("/editexp"  , multipartMiddleware , onEditExp);
        app.post("/addsku"   , multipartMiddleware , onAddSku);
        app.post("/editsku"  , multipartMiddleware , onEditSku);
    }
}