base = {};

//以下日期相关处理：
//取当前日期：2016-02-14 12:12
base.now = function(){
    var now = new Date();
    return base.strtodate(now,"yyyy-MM-dd HH:mm"); 
};

//取当前日期：2016-02-14 12:12
base.nows = function(){
    var now = new Date();
    return base.strtodate(now,"yyyy-MM-dd HH:mm:ss"); 
};

//取当前日期：2016-02-14
base.today = function(){
    var now = new Date();
    return base.strtodate(now,"yyyy-MM-dd"); 
};

//返回两日期间隔天数/小时数/分钟数/秒数
base.datediff = function(difftype,startDate,endDate){
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime(); 
    
    var dates = 0;     
    switch(difftype)
    {
		case "d":
    		dates = parseInt((startTime - endTime)/(1000*60*60*24));     
    		break;
		case "H":
			dates = parseInt((startTime - endTime)/(1000*60*60));     
    		break;
		case "m":
			dates = parseInt((startTime - endTime)/(1000*60));     
    		break;
		case "s":
    		dates = parseInt((startTime - endTime)/(1000));     
    		break;
	}		
    
    return dates;    
}

//返回指定间隔后的日期
base.dateadd = function(dateStr,addtype,num,dateformat){
	try{
		var converted = Date.parse(dateStr);  
	    var myDate = new Date(converted);  
	    if (isNaN(myDate)) 
	    {   
	    	converted = Date.parse(dateStr.replace(/-/g, "/"));  
	    	myDate = new Date(converted);  
	    	if (isNaN(myDate))  
	    	{  
	        	return "";
	        }
	    }  
		    
		switch(addtype)
	    {
	    	case "y":
	    		myDate = new Date(myDate.getFullYear()+num,myDate.getMonth(),myDate.getDate(),myDate.getHours(),myDate.getMinutes(),myDate.getSeconds());
				break;
			case "M":
	    		myDate = new Date(myDate.getFullYear(),myDate.getMonth()+num,myDate.getDate(),myDate.getHours(),myDate.getMinutes(),myDate.getSeconds());
				break;
			case "d":
	    		myDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate()+num,myDate.getHours(),myDate.getMinutes(),myDate.getSeconds());
				break;
			case "H":
				myDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate(),myDate.getHours()+num,myDate.getMinutes(),myDate.getSeconds());
				break;
			case "m":
				myDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate(),myDate.getHours(),myDate.getMinutes()+num,myDate.getSeconds());
				break;
			case "s":
	    		myDate = new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate(),myDate.getHours(),myDate.getMinutes(),myDate.getSeconds()+num);
				break;
		}

		return base.strtodate(myDate,dateformat); 
		
	}catch(e){
		console.log("base.dateadd:"+e.message);
		mui.toast("base.dateadd:"+e.message);
		return "";
	}
};

//将字符串转换成日期格式： yyyyMMddHHmmssfff
base.strtodate = function(dateStr,dateformat){
	try{
	    var converted = Date.parse(dateStr);  
	    var myDate = new Date(converted);  
	    if (isNaN(myDate))  
	    {   
	    	converted = Date.parse(dateStr.replace(/-/g, "/"));  
	    	myDate = new Date(converted);  
	    	if (isNaN(myDate))  
	    	{  
	        	return "";
	        }
	    }  
	    
	    var year = myDate.getFullYear();       //年
	    var month = myDate.getMonth() + 1;     //月
	    var day = myDate.getDate();            //日   
	    var hh = myDate.getHours();            //时
	    var mm = myDate.getMinutes();          //分
	    var ss = myDate.getSeconds();    	   //秒
	    var fff = myDate.getMilliseconds();     //毫秒

	    if(month < 10)	month = "0" + month;   
	    if(day < 10)	day = "0" + day;      
	    if(hh < 10)		hh = "0" + hh;   
	    if(mm < 10) 	mm = "0" + mm;   
	    if(ss < 10) 	ss = "0" + ss;   

	    var clock = "";  
	    switch(dateformat)
	    {
	    	case "yyyy-MM-dd":
	    		clock = year + "-";   
		    	clock += month + "-";    
		    	clock += day;
				break;
			case "yyyy-MM-dd HH":
	    		clock = year + "-";   
		    	clock += month + "-";    
		    	clock += day + " ";
		    	clock += hh;
				break;
	    	case "yyyy-MM-dd HH:mm":
	    		clock = year + "-";   
		    	clock += month + "-";    
		    	clock += day + " ";
		    	clock += hh + ":";
	    		clock += mm; 
				break;
			case "yyyy-MM-dd HH:mm:ss":
	    		clock = year + "-";   
		    	clock += month + "-";    
		    	clock += day + " ";
		    	clock += hh + ":";
		    	clock += mm + ":";
	    		clock += ss; 
				break;
			case "yyyy-MM-dd HH:mm:ss:fff":
	    		clock = year + "-";   
		    	clock += month + "-";    
		    	clock += day + " ";
		    	clock += hh + ":";
		    	clock += mm + ":";
		    	clock += ss + ":";
	    		clock += fff; 
				break;
			case "yyyy":
	    		clock = year;   
				break;
			case "MM":
		    	clock = month;
				break;
			case "dd":
		    	clock = day;
				break;
			case "HH": 
		    	clock = hh;
				break;
			case "mm": 
		    	clock = mm;
				break;
			case "HH:mm":
	    		clock = hh + ":";   
		    	clock += mm;
				break;
			case "HH:mm:ss":
	    		clock = hh + ":";   
	    		clock += mm + ":";
		    	clock += ss;
				break;
			case "yyyyMMddHHmmss":
	    		clock = year;   
		    	clock += month;    
		    	clock += day;
		    	clock += hh;
		    	clock += mm;
		    	clock += ss;
				break;
			case "yyyyMMddHHmmssfff":
	    		clock = year;   
		    	clock += month;    
		    	clock += day;
		    	clock += hh;
		    	clock += mm;
		    	clock += ss;
	    		clock += fff; 
				break;
	    }
	    
	    return clock;
	    
	}catch(e){
		console.log("base.strtodate:"+e.message);
		mui.toast("base.strtodate:"+e.message);
		return "";
	}
};
//以上日期相关处理：

//以下随机数相关处理：
base.random = function(){
	var now = new Date();
    var clock = base.strtodate(now,"yyyyMMddHHmmssfff"); 
    
    clock += parseInt(Math.random(1000)*1000);
    
    return(clock); 
};
//以上随机数相关处理：

//以下字符处理相关处理：
//删除左右两端的空格
base.trim = function(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
//以上字符处理相关处理：

//以下页面取值相关处理：
//根据ID取值对象
base.byId = function(id){
	return document.getElementById(id);
};
//以上页面ID取值相关处理：

//以下Chart相关处理：
base.getLineChartOption = function(title,daylist,datalist){
	var chartOption = {
		title : {
	        text: title,
	        x: 'center',
	        textStyle: {
	            fontSize: 13,
	            fontWeight: 'none',
	            color: '#333'          // 主标题文字颜色
	        }
	    },
		grid: {
			x: 35,
			x2: 10,
			y: 30,
			y2: 25
		},
		toolbox: {
			show: true,
			feature: {
				dataView: {
					show: false,
					readOnly: true
				},
				restore: {
					show: false
				}
			}
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: daylist
		}],
		yAxis: [{
			type: 'value',
			splitArea: {
				show: true 
			}
		}],
		series: [{
			name: title,
			type: 'line',
			data: datalist
		}]
	};
	return chartOption;
};
//以上Chart相关处理

//以下JS暂停函数相关处理

//使用方法：
//function Test() {
//  base.Pause(this, 3000);// 调用暂停函数 
//  this.NextStep=function(){
//      alert("NextStep");
//      //Test();
//  }
//}

base.Pause = function(obj, iMinSecond){
    if (window.eventList == null)
        window.eventList = new Array();
    var ind = -1;
    for ( var i = 0; i < window.eventList.length; i++) {
        if (window.eventList[i] == null) {
            window.eventList[i] = obj;
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        ind = window.eventList.length;
        window.eventList[ind] = obj;
    }
    setTimeout("base.GoOn(" + ind + ")", iMinSecond);
}

base.GoOn = function(ind){
    var obj = window.eventList[ind];
    window.eventList[ind] = null;
    if (obj.NextStep)
        obj.NextStep();
    else
        obj();
}
//以上JS暂停函数相关处理

//以下通知消息相关处理
base.CreatePushMsg = function(msg,dm){
    var options = {title:'消息提醒',cover:false,delay:dm};
    plus.push.createMessage( msg, "LocalMSG", options );

    //if(plus.os.name=="iOS"){
    //    alert('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
    //}
}
//以上通知消息相关处理

//以下SQL值处理：
base.sqlValue = function(value,type){
	switch(type)
    {
    	case "S":
    		value=(value==null?"''":"'"+value+"'");
    		break;
    	case "D":
    		value=(value==null||value==""||value=="null"?"null":"'"+value.replace(".0","")+"'");
			break;
		case "I":
			value=(value==null||value==""?"0":value);
			break;
	}
	    
    return(value); 
};
//以上SQL值处理：

//以下：右滑关闭页面 
//function touClass(){
//	// 公有方法
//	this.touch = function(fn1,fn2){
//		this.addEventListener('touchstart',function(event){
//			var touch = event.targetTouches[0];
//			// 开始坐标
//			this.startx = touch.pageX;
//			this.starty = touch.pageY;
//		})
//		
//		this.addEventListener('touchmove',function(event){
//			var touch = event.targetTouches[0];
//			// 结束坐标
//			this.endx = touch.pageX;
//			this.endy = touch.pageY;
//			var x = this.endx - this.startx;
//			var y = this.endy - this.starty;
//			var w = x<0?x-1:x; //x轴的滑动值, w为x的绝对值
//			var h = y<0?y-1:y; //y轴的滑动值
//			
//			if(w>h){ //如果是在x轴中滑动,阻止默认事件
//				event.preventDefault(); // 解决微信touchmove冲突并实现上下可滑动
//			}
//		})
//		
//		this.addEventListener('touchend',function(event){
//			if((this.startx - this.endx)>=100 && fn1){
//				// 执行左滑回调
//				fn1();
//			}
//			
//			if((this.endx - this.startx)>=100 && fn2){
//				// 执行右滑回调
//				fn2();
//			}
//		})
//	}
//}
//以上：右滑关闭页面

//以下：ajax处理
base.ajax = function(url, type, json, fnSucc, fnFaild){
    //1.创建对象
    var oAjax = null;
    if(window.XMLHttpRequest){
        oAjax = new XMLHttpRequest();
		if(oAjax.overrideMimeType) {
			oAjax.overrideMimeType('text/xml');
		};
    }else{
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    /*if(typeof XMLHttpRequest != "undefined"){
        oAjax = new XMLHttpRequest();
    }else if(typeof ActiveXObject != "undefined"){
        if(typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];

            for(var i=0, len=versions.length;i < len; i++){
                try{
                    oAjax = new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                }catch(ex){
                        //跳过
                }
            }
        }
        oAjax = new ActiveXObject(arguments.callee.activeXString);
    }else{
        throw new Error("NO XHR object available");
    }*/
      
    //2.连接服务器  
    oAjax.open(type, url, true);   //open(方法, url, 是否异步)
    //oAjax.setRequestHeader("Authorization","MyApp_DaneJiang_48F0B130E3A94A878052C2EF445B132A");
    oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
	
    //3.发送请求  
    oAjax.send("method=hr&json="+json+"&Authorization=MyApp_DaneJiang_48F0B130E3A94A878052C2EF445B132A");
      
    //4.接收返回
    oAjax.onreadystatechange = function(){  //OnReadyStateChange事件
        if(oAjax.readyState == 4){  //4为完成
            if(oAjax.status == 200){    //200为成功
                fnSucc(oAjax.responseText);
            }else{
                fnFaild("XMLHTTP error.");
            }
        }
    };
}
base.ajaxbyJquery= function(url, type, json, fnSucc, fnFaild){
	$.ajax({
	    url:url,
	    type:type,
	    dataType:"json",
    	crossDomain:true,
	    data:{
	    	"json":json,
	    	"Authorization":"MyApp_DaneJiang_48F0B130E3A94A878052C2EF445B132A"
		},
		success:function(result){
			fnSucc(JSON.stringify(result));
		},
	    error:function(xhr,textStatus,errorThrown){
	    	fnFaild("Ajax error.");		    		
	    }
	});
}
//以上：ajax处理

//以下：foreach处理
base.foreach = function(i, rows, fnDeal, fnSuc, fnErr){
	try{
		//console.log(i);
		
		fnDeal(i, function(){
			i+=1;
			if(i>=rows){
				if(fnSuc) fnSuc();
			}else{
				base.foreach(i, rows, fnDeal, function(){
					if(fnSuc) fnSuc();
				},function(){
					if(fnErr) fnErr();
				});
			}
		});
	}catch(e){
		console.log("base.foreach error:"+e.message);
		if(fnErr){
			fnErr("base.foreach error:"+e.message);
		}
	}
};
//以上：foreach处理