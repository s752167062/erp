var skulist;
function getSkuList(){
	var xmlhttp;
    if (window.XMLHttpRequest)
    {
      	//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      	xmlhttp=new XMLHttpRequest();
    }
    else
    {
      	// IE6, IE5 浏览器执行代码
      	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
      	if (xmlhttp.readyState==4 && xmlhttp.status==200)
      	{
       		var respones_ = xmlhttp.responseText;
       		if(respones_){
       			const list_ = JSON.parse(respones_);
       			skulist = list_

       			var context_ = ""
       			var context_fake = ""
       			for (var i = 0; i < skulist.length; i++) {
       				var item = skulist[i];
       				context_ =  context_ + '<a class="dropdown-item" href="#" onclick="onOrderSkuSeleter(this)" value="'+ item.id +'" >'+ item.name +'</a>' 
       			};

       			document.getElementById("orderSkuSeleter_menu").innerHTML = context_;
       			document.getElementById("fakeSkuSeleter_menu").innerHTML = context_;
       		}
       	}
    }
    xmlhttp.open("GET","/skulist",true);
    xmlhttp.send();   		
}

function onOrderSkuSeleter(e){
	console.log(">>>>>> onOrderSkuSeleter " + e.getAttribute("value"));
	var dropdown_menu = e.parentNode;
	var btn_orderSkuSeleter     = dropdown_menu.previousElementSibling;

	// console.log(dropdown_menu);
	// console.log(btn_orderSkuSeleter);
	btn_orderSkuSeleter.innerHTML = e.innerHTML;
	btn_orderSkuSeleter.value     = e.getAttribute("value");
}

function onInput(e){
	console.log(">>>>>>> onInput ", e.value);
	e.setAttribute("value" , e.value );
}

var defaultdaily_expnum ;
function addDailyOrderHtml(){
	var innerhtml = document.getElementById("daily_expnum").innerHTML;
 	if(!defaultdaily_expnum){
 		defaultdaily_expnum = innerhtml	;
 	}

 	innerhtml += defaultdaily_expnum;
 	
    document.getElementById("daily_expnum").innerHTML = innerhtml;                		
}

var defaultdaily_fake
function addDailyFakeHtml(){
	var innerhtml_fake =  document.getElementById("daily_fake").innerHTML;

 	if(!defaultdaily_fake){
 		defaultdaily_fake = innerhtml_fake	;
 	}

 	innerhtml_fake += defaultdaily_fake;
    document.getElementById("daily_fake").innerHTML = innerhtml_fake;
}


function dailyUse(){
	var oData = new FormData();

	var admoney = document.getElementById("admoney").value;
	oData.append("admoney",admoney);

	var order_sku = document.getElementsByName("order_sku");
	var order_num = document.getElementsByName("order_num");
	var orderlist = []
	if(order_sku && order_num){
		for (var i = 0; i < order_sku.length; i++) {
			var sku = order_sku[i].value;
			var num = order_num[i].value;
			orderlist.push({ sku_:sku , num_:num})
			console.log(">>>>> " + sku +  " " + num);
		};
	}
	oData.append("orderlist",JSON.stringify(orderlist));

	var fake_num = document.getElementsByName("fake_num");
	var fake_money = document.getElementsByName("fake_money");
	var fake_sku = document.getElementsByName("fake_sku");
	var fakelist =[]
	if(fake_num && fake_money && fake_sku){
		for (var i = 0; i < fake_sku.length; i++) {
			var sku = fake_sku[i].value;
			var num = fake_num[i].value;
			var money = fake_money[i].value;
			fakelist.push({ sku_:sku , num_:num , money_:money})
			console.log(">>>>> " + sku +  " " + num + " " + money);
		};
	}
	oData.append("fakelist",JSON.stringify(fakelist));

	var xmlhttp;
    if (window.XMLHttpRequest)
    {
      	//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      	xmlhttp=new XMLHttpRequest();
    }
    else
    {
      	// IE6, IE5 浏览器执行代码
      	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
      	if (xmlhttp.readyState==4 && xmlhttp.status==200)
      	{
       		var respones_ = xmlhttp.responseText;
       		if(respones_){
       			var data = JSON.parse(respones_);
       			if(data && data.code == 1){
       				$('#dailyModal').modal('hide')
       				//刷新UI
       				//提示
       				
       				return
       			}else{
       				
       			}


       		}
      	}
    }
	xmlhttp.open("post","/dailyuse",true);
    xmlhttp.send(oData);

}

//编辑editExp
function editExp(){
	var exp_id = document.getElementById("exp_id").value;
	var exp_num = document.getElementById("exp_num").value;
	var exp_money = document.getElementById("exp_money").value;


	var oData = new FormData();
	oData.append("exp_id",exp_id);
	oData.append("exp_num",exp_num);
	oData.append("exp_money",exp_money);

	var xmlhttp;
  if (window.XMLHttpRequest)
  {
    	//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    	xmlhttp=new XMLHttpRequest();
  }
  else
  {
    	// IE6, IE5 浏览器执行代码
    	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    	if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
     		var respones_ = xmlhttp.responseText;
     		if(respones_){
     			var data = JSON.parse(respones_);
     			if(data && data.code == 1){
     				$('#edModal').modal('hide')
     				//刷新UI
     				//提示
     				
     				return
     			}else{
     				
     			}


     		}
    	}
  }
	xmlhttp.open("post","/editexp",true);
  xmlhttp.send(oData);
}


//编辑 addsku
function addsku(){
  var sku_id  = document.getElementById("sku_id").value;
  var sku_name= document.getElementById("sku_name").value;
  var sku_num = document.getElementById("sku_num").value;
  var sku_baseMoney = document.getElementById("sku_baseMoney").value;
  var sku_sellMoney = document.getElementById("sku_sellMoney").value;

  var oData = new FormData();
  oData.append("sku_id",sku_id);
  oData.append("sku_name",sku_name);
  oData.append("sku_num",sku_num);
  oData.append("sku_baseMoney",sku_baseMoney);
  oData.append("sku_sellMoney",sku_sellMoney);

  var xmlhttp;
  if (window.XMLHttpRequest)
  {
      //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xmlhttp=new XMLHttpRequest();
  }
  else
  {
      // IE6, IE5 浏览器执行代码
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        var respones_ = xmlhttp.responseText;
        if(respones_){
          var data = JSON.parse(respones_);
          if(data && data.code == 1){
            $('#skuModal').modal('hide')
            //刷新UI
            //提示
            
            return
          }else{
            
          }


        }
      }
  }
  xmlhttp.open("post","/addsku",true);
  xmlhttp.send(oData);
}

function editsku(){
  
}

