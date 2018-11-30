
const conf = require("./../conf/config");
const mongodbMgr = require("./mongodbMgr");
const pddMgr = require("./pddMgr");

//添加监控对象
function addkeeper(req , res){
    console.log(">>>> addkeeper  ");
    var query = req.query;
    if(query){
        console.log(query)
        var id = query.id;
        if(id){
            var path = conf.goodspath + id
            var data = makeKeeperRow(path)
            if(data){
                mongodbMgr.instertRow(conf.keeper , data , function(result){
                    if(result){
                        //创建记录表 记录数据变化
                        createIDKeeperHistory(data.goods_id)
                        res.send("{ \"status\":1 }")
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
            mongodbMgr.select("t_" +id , {} ,function(result){
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

function deletekeeper(req, res){
    console.log(">>>> deletekeeper  ");
    var query = req.query;
    if(query){
        console.log(query)
        var id = query.id;
        if(id){
            mongodbMgr.deleteRow(conf.keeper , {"goods_id":id} ,function(result){
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

function hookall(req,res){
    pddMgr.hookAll();
    res.send("{ \"status\":1 ,  \"msg\":\"\"}")
}

function fixkeeper(req,res){
    pddMgr.fixkeeper();
    res.send("{ \"status\":1 ,  \"msg\":\"\"}")
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
            mongodbMgr.createTable("t_" +id, function(res){
                if(res){
                    mongodbMgr.instertRow("t_" +id , data, function(res_){
                        if(res_){
                            //同步更新下 keeper 表中的图片地址
                            mongodbMgr.updateRow(conf.keeper , {"goods_id":id } , {"img":data.img ,"title":data.title} ,function(result){
                                console.log(">>>>> //同步更新下 keeper 表中的图片地址  ");
                            })
                        }
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
        app.get("/deletekeeper", deletekeeper);
        app.get("/hookall", hookall);
        app.get("/fixkeeper", fixkeeper);
        // app.post("/upload", upload.single('iconfile') , createGame); //接收上传的ICON
    }
}