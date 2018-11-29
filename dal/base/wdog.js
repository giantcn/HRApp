wdog = {};

var network = false;
var ref = null;

wdog.network = function(authid,msg){
	try{
		msg = msg ? msg : 'no';
		
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE){
			mui.toast("当前网络不给力，无法连接wilddog云端数据库！");
		}else{
			network = true;
			ref = new Wilddog("https://dailyschedule.wilddogio.com/"+authid);
			//ref.auth.uid = authid;
			
			//mui.toast(ref.auth.uid);
			
			/*//注册用户
			ref.createUser({email:"dane.jiang@outlook.com",password:"da123456"},function(err,data){
                if(err!=null){
                    mui.toast("注册失败");
                } else {
                    mui.toast("注册成功");
                }
            });
            
            //验证用户
            ref.authWithPassword({email:"dane.jiang@outlook.com",password:"da123456"},function(err,data){
       			if(err == null){
         			mui.toast("注册成功");
          		}
   				else {
					mui.toast("注册失败");
          		}
			});*/

			if(msg=="no"){
				mui.toast("当前网络已连接到wilddog云端数据库！");
			}
		}
		return "";
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.network:"+e.message);
	}
};

wdog.setRef = function(authid,msg){
	try{
		var refself = null;
		msg = msg ? msg : 'no';
		
		if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE){
			mui.toast("当前网络不给力，无法连接wilddog云端数据库！");
		}else{
			refself = new Wilddog("https://dailyschedule.wilddogio.com/"+authid);

			if(msg=="no"){
				mui.toast("当前网络已连接到wilddog云端数据库！");
			}
		}
		return refself;
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.network:"+e.message);
		return null;
	}
};

//插入数据
wdog.add = function(newData){
	try{
		if(!network){
			mui.toast("当前wilddog网络不给力，请稍后再试！");
		}else
		{
			if(!ref){
				mui.toast("当前wilddog网络不给力，请稍后再试！");
			}else{
				var newRef = ref.push(newData);
				//mui.toast("添加成功~");
			}
		}
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.add:"+e.message);
	}	
};

//插入数据
wdog.addKey = function(key,newData){
	try{
		if(!network){
			mui.toast("当前wilddog网络不给力，请稍后再试！");
		}else
		{
			if(!ref){
				mui.toast("当前wilddog网络不给力，请稍后再试！");
			}else{
				
				var newRef = ref.child(key);
				newRef.set(newData);
				//mui.toast("添加成功~");
			}
		}
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.addKey:"+e.message);
	}	
};

//更新数据
wdog.update = function(key,newData){
	try{
		if(!network){
			mui.toast("当前wilddog网络不给力，请稍后再试！");
		}else
		{
			if(!ref){
				mui.toast("当前wilddog网络不给力，请稍后再试");
			}else{
				var newRef = ref.child(key);
				newRef.update(newData);
				//mui.toast("修改成功~");
			}
		}
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.update:"+e.message);
	}	
};

//删除数据
wdog.delete = function(key){
	try{
		if(!network){
			mui.toast("当前wilddog网络不给力，请稍后再试！");
		}else
		{
			if(!ref){
				mui.toast("当前wilddog网络不给力，请稍后再试！");
			}else{
				var newRef = ref.child(key);
				newRef.remove();
				//mui.toast("删除成功~");
			}
		}
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.delete:"+e.message);
	}	
};

//获取数据
wdog.empty = function(next){
	try{
		next = next ? next : 'no';
		
		if(!network){
			mui.toast("当前wilddog网络不给力，请稍后再试！");
		}else
		{
			if(!ref){
				mui.toast("当前wilddog网络不给力，请稍后再试！");
			}else{
				ref.once("value", function(snapshot) {
					var result = snapshot.val();
					var num = 0;
					mui.each(result, function(key, elem) {
						num +=1;

						if(num==30){
							base.Pause(this, 5000);// 调用暂停函数
							this.NextStep=function(){								
								wdog.empty("yes");
							}
						}else if(num<30){
							wdog.delete(key);
						}
					});
					
					if(next=="no"){
						if(num>0&&num<30){
							mui.toast("wilddog服务器数据已清空！");
						}else if(num==0){
							mui.toast("wilddog服务器无数据，无需清空！");
						}
					}else{
						mui.toast("wilddog服务器数据已清空！");
					}
				});
			}
		}
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.empty:"+e.message);
	}	
};

//获取数据
wdog.query = function(){
	try{
		if(!network){
			mui.toast("当前wilddog网络不给力，请稍后再试！");
		}else
		{
			if(!ref){
				mui.toast("当前wilddog网络不给力，请稍后再试！");
			}else{
				ref.once("value", function(data) {
					return data.val();
					/* var result = snapshot.val();
					 * mui.each(result, function(key, elem) {
						mui.alert(key+"|"+elem.title+"|"+elem.col2+"|"+elem.col3);
					})
					 */
				});
				//mui.toast("数据读取成功~");
			}
		}
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.query:"+e.message);
	}	
};

wdog.queryKey = function(keyID){
	try{
		if(!network){
			mui.toast("当前wilddog网络不给力，请稍后再试！");
		}else
		{
			if(!ref){
				mui.toast("当前wilddog网络不给力，请稍后再试！");
			}else{
				
				ref.once("value", function(data) {
					var returnvalue = null;
					
					var result = data.val();
					mui.each(result, function(key, elem) {
						if(key==keyID) returnvalue=elem;
					})
					
					return returnvalue;
				});
				
				return null;
			}
		}
	}catch(e){
		console.log(e.message);
		mui.toast("wdog.queryKey:"+e.message);
	}
};
