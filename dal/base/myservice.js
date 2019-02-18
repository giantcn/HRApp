myservice = {};

var mynetwork = false;
var myservice_url = "http://115.239.250.46:9001/HR/MyApp.ashx";//"http://115.239.250.46:6600/";//"http://172.20.10.2:6660/";//"http://danejiang.tpddns.cn:8445";

myservice.network = function(msg){
	try{
		msg = msg ? msg : 'no';
		
		mynetwork = true;
		if(msg=="no"){
			mui.toast("当前网络已连接到MyService服务！");
		}
		return true;
	}catch(e){
		console.log(e.message);
		mui.toast("myservice.network:"+e.message);
		return false;
	}
}

myservice.postdata= function (json, fnSuc, fnErr){
	try{
		if(!myservice.network("yes")){
			mui.toast("当前MyService网络不给力，请稍后再试！");
			if(fnErr){
				fnErr("当前MyService网络不给力，请稍后再试！");
			}
		}else{
			base.ajax(myservice_url+"?response=application/json","post",json,function(result){
				//console.log(result);
				var jsonitem=JSON.parse(result);
				if(jsonitem[0].result=="true"){
					fnSuc(jsonitem[0].error);
				}else{
					if(fnErr){
						fnErr('数据操作失败，错误信息：'+jsonitem[0].error);
					}
				}
			},function(error){
				mui.toast('数据操作失败，错误信息：'+error);
				if(fnErr){
					fnErr('数据操作失败，错误信息：'+error);
				}
			});
			
			/*mui.ajax(myservice_url+"?response=application/json", {
				data:{json:json},
				dataType:"jsonp",
                type:"post",
                timeout:1000000,
                async:false,
		        success:function(data){
		            returnValue=data;
		        },
				error: function(xhr, errorType, error) {
					mui.toast('数据操作失败，错误信息：'+error);
					returnValue="false";
				}
		   });*/
		}
	}catch(e){
		console.log(e.message);
		mui.toast("myservice.postdata error:"+e.message);
		if(fnErr){
			fnErr("myservice.postdata error:"+e.message);
		}
	}	
}