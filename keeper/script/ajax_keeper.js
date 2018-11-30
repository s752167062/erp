var skudata;
function allkeeper(){
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
       			const alldata = JSON.parse(respones_);
       			skudata = alldata

            if(alldata.status != 1){
              console.log(">>>> 没有数据");
              alert(">> 获取数据异常 <<")
            }

            var skulist = alldata.data;
       			var context_ = ""
       			for (var i = 0; i < skulist.length; i++) {
       				var item = skulist[i];
       				context_ =  context_ + '<li class="list-group-item d-flex justify-content-between align-items-center" onclick="showHistory('+ item.goods_id+')">'+ item.title 
                                   +    '<img class="img-rounded" style="max-width:100%;height:80px;" src="'+ item.img +'">'
                                   + '</li>'
                                   + '<div class="container" id="cont_'+item.goods_id+'"></div>'
       			};

       			document.getElementById("skulist_group").innerHTML = context_;
       		}
       	}
    }
    xmlhttp.open("GET","/allkeeper",true);
    xmlhttp.send();   		
}

function showHistory(id){
  console.log(">>>>> showHistory id " + id)
  document.getElementById("cont_"+id).innerHTML = '<canvas id="lines-graph'+ id+'"></canvas>'

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
          var history = JSON.parse(respones_);
          if(history && history.status == 1){
            var list = history.data

            var labels = [];
            var number = [];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                labels.push(item.times);

                var num = parseInt(item.number.substring(1).substring(1));
                number.push(num);
            }

            console.log(number);

            var lineChartData = {
                labels: labels,
                datasets: [
                {
                    label: "销量变化",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: number,
                    spanGaps: false,
                }
                ]
            };

            var ctx = document.getElementById("lines-graph" + id).getContext("2d");
            var LineChart = new Chart(ctx, {
                type: 'line',
                data: lineChartData,
                responsive: true,
                bezierCurve : false
            });
            return
          }else{
            
          }
        }
      }
  }
  xmlhttp.open("get","/goodshistory?id=" + id,true);
  xmlhttp.send();
}


//编辑 addsku
function addsku(){
  var sku_id  = document.getElementById("sku_id").value;

  var that = this;
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
          if(data && data.status == 1){
            //刷新UI
            //提示
            that.allkeeper()
            return
          }else{
            
          }


        }
      }
  }
  xmlhttp.open("get","/addkeeper?id=" + sku_id,true);
  xmlhttp.send();
}


