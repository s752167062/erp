
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

/// maller mall 中的所有单独记录到表 mall_maillid_goodsid
function addmaller(req,res){
    console.log(">>>> addmaller  ");
    var query = req.query;
    if(query){
        console.log(query)
        var id = query.id;
        if(id){
            var path = conf.mallpath + id + "&item_index=0&sp=0"
            // var data = makeMallerRow(path)
            var data = {} ;
            data.path = path ;
            data.mall_id = id ;
            if(data){
                mongodbMgr.instertRow(conf.maller , data , function(result){
                    if(result){
                        //创建记录表 记录数据变化
                        createIDMallerHistory(data.mall_id)
                        res.send("{ \"status\":1 }")
                    }
                })
                
            }else{
                res.send("{ \"status\":0 ,  \"msg\":\"没有ID\"}")
            }
            
        } 
    }  
}

function makeMallerRow(path){
    var mall_id = "mall_id"
    var start = path.indexOf(mall_id);
    if(start < 0){
        return null;
    }

    pg = path.substring( start + mall_id.length +1 , path.length)
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
    data.mall_id = pg;
    return data 
}

function createIDMallerHistory(id){
    console.log(">>> createIDMallerHistory id " + id);
    pddMgr.hookMallDataByID(id,function(data){
        if(data){
            //hook 到mall的数据
            var goodslist = []
            for (var i = 0; i < data.goods.length; i++) {
                var goods = data.goods[i]
                goodslist.push(goods.goods_id)
            }
            mongodbMgr.updateRow(conf.maller , {"mall_id":id } , {"img":data.img ,"name":data.name, "goodslist":goodslist} ,function(result){
                                    console.log(">>>>> //同步更新下 maller 表中的图片地址 和名字  ");
                                    if(result){
                                        for (var i = 0; i < data.goods.length; i++) {
                                            var item = data.goods[i]
                                            mongodbMgr.createTable("mall_" +id + "_" + item.goods_id, function(res){
                                                if(res){
                                                    mongodbMgr.instertRow("mall_" +id + "_" + item.goods_id , item, function(res_){ }) 
                                                }
                                            });

                                        }
                                    }
                                    //
                                })   
        }
    })
}

function allmaller(req,res){
    console.log(">>>> allmaller  ");
    mongodbMgr.select(conf.maller , {} ,function(result){
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
function mallergoods(req,res){
    console.log(">>>> mallergoods  ");
    var query = req.query;
    if(query){
        console.log(query)
        var mall_id = query.mall_id;
        var goods_id = query.goods_id;
        if(id){
            mongodbMgr.select("mall_" +mallid+ "_" + goods_id  , {} ,function(result){
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
function deletemaller(req,res){
    console.log(">>>> deletemaller  ");
    var query = req.query;
    if(query){
        console.log(query)
        var id = query.id;
        if(id){
            mongodbMgr.deleteRow(conf.maller , {"mall_id":id} ,function(result){
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
function hookallmaller(req,res){

}
function fixmaller(req,res){

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

        //
        app.get("/addmaller", addmaller); //添加监控对象
        app.get("/allmaller", allmaller);
        app.get("/mallergoods", mallergoods);
        app.get("/deletemaller", deletemaller);
        app.get("/hookallmaller", hookallmaller);
        app.get("/fixmaller", fixmaller);
    }
}