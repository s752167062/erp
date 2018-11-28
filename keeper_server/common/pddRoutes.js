
const conf = require("./../conf/config");
const mongodbMgr = require("./mongodbMgr");
const pddMgr = require("./pddMgr");

//添加监控对象
function addkeeper(req , res){
    console.log(">>>> addkeeper  ");
    var query = req.query;
    if(query){
        console.log(query)
        var path = query.path;
        if(path){
            var data = makeKeeperRow(path)
            if(data){
                mongodbMgr.instertRow(conf.keeper , data , function(result){
                    if(result){
                        //创建记录表 记录数据变化
                        createIDKeeperHistory(data.goods_id)
                        res.send("{ \"status\":1 ")
                    }
                })
                
            }else{
                res.send("{ \"status\":0 ,  \"msg\":\"没有ID\"}")
            }
            
        } 
    }  
}

function allkeeper(req , res){
    console.log(">>>> allkeeper  ");
    mongodbMgr.select(conf.keeper , {} ,function(result){
        if(result){
            var data ={};
            data.status = 1;
            data.data = result;

            res.send(JSON.stringify(data));
            return ;
        }

        res.send("{ \"status\":0 ,  \"msg\":\"没有数据\"}")
    })
}

function goodshistory(req , res){
    console.log(">>>> goodshistory  ");
    var query = req.query;
    if(query){
        console.log(query)
        var id = query.id;
        if(id){
            mongodbMgr.select(id , {} ,function(result){
                if(result){
                    var data ={};
                    data.status = 1;
                    data.data = result;

                    res.send(JSON.stringify(data));
                    return ;
                }

                res.send("{ \"status\":0 ,  \"msg\":\"没有数据\"}")
            })
        } 
    }  
}


function makeKeeperRow(path){
    var goods_id = "goods_id"
    var start = path.indexOf(goods_id);
    if(start < 0){
        return null;
    }

    pg = path.substring( start + goods_id.length +1 , path.length)
    console.log(">>>>> pg1 " + pg);
    var end_ = "&"
    var end = pg.indexOf(end_);
    if(end > 1){
        var id = pg.substring(0, end)
        pg = id;
    }
    console.log(">>>>> pg2 " + pg);
    
    var data = {}
    data.path = path;
    data.goods_id = pg;
    return data 
}

function createIDKeeperHistory(id){
    console.log(">>> createIDKeeperHistory id " + id);
    pddMgr.hookDataByID(id,function(data){
        if(data){
            //hook 到数据
            mongodbMgr.createTable(id, function(res){
                if(res){
                    mongodbMgr.instertRow(id , data, function(res_){

                    }) 
                }
            });
               
        }
    })
}


module.exports = function(app){
    if(app){
        //监听接口
        app.get("/addkeeper", addkeeper); //添加监控对象
        app.get("/allkeeper", allkeeper);
        app.get("/goodshistory", goodshistory);
        // app.post("/upload", upload.single('iconfile') , createGame); //接收上传的ICON
    }
}