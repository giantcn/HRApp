mui.init({
	swipeBack:true
});

var isSave="0";
var divName="page01";
var pages = ['page01', 'page02', 'page03', 'page04'];
var titles = ['卫生状况', '饭菜质量', '服务态度', '综合评价'];

function loaddiv() {
	for (var i = 0; i < pages.length; i++) {
		if(divName==pages[i]){
			base.byId(pages[i]).style.display="";
			base.byId("title").innerHTML="食堂满意度评分表 - "+titles[i];
			
			base.byId("page").innerHTML=(i+1)+"/"+pages.length+" ";
			if(i==0){
				base.byId("previous").style.display="none";
			}else{
				base.byId("previous").style.display="";
			}
			
			if(i==(pages.length-1)){
				base.byId("next").className="mui-icon mui-pull-right";
				base.byId("next").innerHTML="　";
				
				if(isSave=="0"){
					base.byId("savemenu").style.display="";	
				}
			}else{
				base.byId("next").className="mui-icon mui-icon-forward mui-pull-right";
				base.byId("next").innerHTML="";
				
				base.byId("savemenu").style.display="none";	
			}
		}else{
			base.byId(pages[i]).style.display="none";
		}
	}
	mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
}

$(document).ready(function() {
	mui('.mui-scroll-wrapper').scroll();
	loaddiv();
});

//自定义事件：翻页功能
function pageInit(flag){
 	if(flag=="previous")
 	{
		for (var i = 0; i < pages.length; i++) {
			if(divName==pages[i]){
				if(i==0){
					//第一页
					//alert("已经是第一页");
				}else{
					//下一页
					divName=pages[i-1];
					loaddiv();
					i=pages.length;
				}
			}
		}
	}
 	else{
 		for (var i = 0; i < pages.length; i++) {
			if(divName==pages[i]){
				if(i==(pages.length-1)){
					//提交简历
					//alert("提交简历");
				}else{
					//下一页
					divName=pages[i+1];
					loaddiv();
					i=pages.length;
				}
			}
		}
 	}
}

//定义上一页按钮事件
base.byId("previous").addEventListener('tap', function() {
	pageInit("previous");
});
base.byId("previous02").addEventListener('tap', function() {
	pageInit("previous");
});
base.byId("previous03").addEventListener('tap', function() {
	pageInit("previous");
});
base.byId("previous04").addEventListener('tap', function() {
	pageInit("previous");
});

//定义下一页按钮事件
base.byId("next").addEventListener('tap', function() {
	pageInit("next");
});
base.byId("next01").addEventListener('tap', function() {
	pageInit("next");
});
base.byId("next02").addEventListener('tap', function() {
	pageInit("next");
});
base.byId("next03").addEventListener('tap', function() {
	pageInit("next");
});

var page01 = ['', '', '', ''];
var page02 = ['', '', '', ''];
var page03 = ['', '', ''];
var page04 = [''];

var list = document.querySelectorAll('.mui-table-view.mui-table-view-radio');
for (var i = 0; i < list.length; i++) {
	list[i].addEventListener('selected',function(e){
		var id=e.detail.el.id;
		//mui.toast("当前选中的为："+id);
		if(id.substring(0, 6)=="page01"){
			page01[parseInt(id.substring(7, 9))-1]=id.substring(10, 12);
			//mui.toast("page01["+(parseInt(id.substring(7, 9))-1).toString()+"]:"+page01[parseInt(id.substring(7, 9))-1]);
		}
		if(id.substring(0, 6)=="page02"){
			page02[parseInt(id.substring(7, 9))-1]=id.substring(10, 12);
		}
		if(id.substring(0, 6)=="page03"){
			page03[parseInt(id.substring(7, 9))-1]=id.substring(10, 12);
		}
		if(id.substring(0, 6)=="page04"){
			page04[parseInt(id.substring(7, 9))-1]=id.substring(10, 12);
		}
	});
}

//定义保存按钮事件
base.byId("save").addEventListener('tap', function() {
	var json="[{";
	for (var i = 0; i < page01.length; i++) {
		if(page01[i]==""){
			divName="page01";
			loaddiv();
			mui.toast("请选择第“"+(i+1).toString()+"”项评分内容！");
			return;
		}

		if(json=="[{"){
			json +="\"page01_0"+(i+1).toString()+"\":\""+page01[i]+"\",\"page01_0"+(i+1).toString()+"_remark\":\""+base.byId("page01_0"+(i+1).toString()+"_remark").value+"\"";
		}else{
			json +=",\"page01_0"+(i+1).toString()+"\":\""+page01[i]+"\",\"page01_0"+(i+1).toString()+"_remark\":\""+base.byId("page01_0"+(i+1).toString()+"_remark").value+"\"";
		}
	}
	for (var i = 0; i < page02.length; i++) {
		if(page02[i]==""){
			divName="page02";
			loaddiv();
			mui.toast("请选择第“"+(i+1).toString()+"”项评分内容！");
			return;
		}
		
		json +=",\"page02_0"+(i+1).toString()+"\":\""+page02[i]+"\",\"page02_0"+(i+1).toString()+"_remark\":\""+base.byId("page02_0"+(i+1).toString()+"_remark").value+"\"";
	}
	for (var i = 0; i < page03.length; i++) {
		if(page03[i]==""){
			divName="page03";
			loaddiv();
			mui.toast("请选择第“"+(i+1).toString()+"”项评分内容！");
			return;
		}
		
		json +=",\"page03_0"+(i+1).toString()+"\":\""+page03[i]+"\",\"page03_0"+(i+1).toString()+"_remark\":\""+base.byId("page03_0"+(i+1).toString()+"_remark").value+"\"";
	}
	for (var i = 0; i < page04.length; i++) {
		if(page04[i]==""){
			divName="page04";
			loaddiv();
			mui.toast("请选择第“"+(i+1).toString()+"”项评分内容！");
			return;
		}
		
		json +=",\"page04_0"+(i+1).toString()+"\":\""+page04[i]+"\",\"page04_0"+(i+1).toString()+"_remark\":\""+base.byId("page04_0"+(i+1).toString()+"_remark").value+"\"";
	}	

	json +="}]";

	myservice.postdata("[{\"Type\":\"hr-dining\",\"Rows\":"+json+"}]",function(data){
		isSave="1";
		base.byId("savemenu").style.display="none";	
		mui.toast("您的食堂满意度评分表已提交，谢谢！");
	},function(error){
		mui.toast("您的食堂满意度评分表提交失败，请稍后再试："+error);
	});
});

//左右滑动
function touClass(){
	// 公有方法
	this.touch = function(fn1,fn2){
		this.addEventListener('touchstart',function(event){
			var touch = event.targetTouches[0];
			// 开始坐标
			this.startx = touch.pageX;
			this.starty = touch.pageY;
		});
		
		this.addEventListener('touchmove',function(event){
			var touch = event.targetTouches[0];
			// 结束坐标
			this.endx = touch.pageX;
			this.endy = touch.pageY;
			var x = this.endx - this.startx;
			var y = this.endy - this.starty;
			var w = x<0?x-1:x; //x轴的滑动值, w为x的绝对值
			var h = y<0?y-1:y; //y轴的滑动值
			
			this.x=x; 
			
			if(w>h){ //如果是在x轴中滑动,阻止默认事件
				event.preventDefault(); // 解决微信touchmove冲突并实现上下可滑动
			}
		});
		
		this.addEventListener('touchend',function(event){
			if(0-this.x>=100 && fn1){
				//执行左滑回调
				this.x=0;
				fn1();
			}
			if(this.x>=100 && fn2){
				//执行右滑回调
				this.x=0;
				fn2();
			}
		});
	}
}

//右滑返回
touClass.call(document);
document.touch(function(){
	//触发下一页按钮事件
	//pageInit("next");
},function(){
	//触发上一页按钮事件
	//pageInit("previous");
});