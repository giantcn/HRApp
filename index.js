mui.init({
	swipeBack:true
});

var divName="info";
var pages = ['info', 'job', 'work', 'skill'];//, 'interest', 'person'
var titles = ['基本信息', '意向岗位', '工作经验', '技能特长'];//, '兴趣爱好', '自我评价'

function loaddiv() {
	for (var i = 0; i < pages.length; i++) {
		if(divName==pages[i]){
			base.byId(pages[i]).style.display="";
			base.byId("title").innerHTML="简历 - "+titles[i];
			
			base.byId("page").innerHTML=(i+1)+"/"+pages.length+" ";
			if(i==0){
				base.byId("previous").style.display="none";
			}else{
				base.byId("previous").style.display="";
			}
			
			if(i==(pages.length-1)){
				base.byId("next").className="mui-icon mui-pull-right";
				base.byId("next").innerHTML="　";
				
				base.byId("savemenu").style.display="";				
			}else{
				base.byId("next").className="mui-icon mui-icon-forward mui-pull-right";
				base.byId("next").innerHTML="";
				
				base.byId("savemenu").style.display="none";	
			}
		}else{
			base.byId(pages[i]).style.display="none";
		}
	}
}

var userid="";
$(document).ready(function() {
	mui('.mui-scroll-wrapper').scroll();
	loaddiv();
	
	if(userid==""){
		base.byId("worklist").style.display="none";
		base.byId("workedit").style.display="";
		
		skilllist(JSON.parse("[]"));
		interestlist(JSON.parse("[]"));
	}else{
		myservice.postdata("[{\"Type\":\"hr-user\",\"Rows\":[{\"userid\":\""+userid+"\",\"flag\":\"2\"}]}]",function(data){
			if(data.length>0){
				userid = data[0].userid;
				base.byId("mobile").value=data[0].mobile;
				base.byId("name").value=data[0].name;
				base.byId("sex").value=data[0].sex;
				base.byId("birth").value=data[0].birth;
				base.byId("worktime").value=data[0].worktime;	
				base.byId("education").value=data[0].education;
				base.byId("marry").value=data[0].marry;
				base.byId("email").value=data[0].email;
				base.byId("jobname").value=data[0].jobname;
				base.byId("jobtype").value=data[0].jobtype;
				base.byId("jobcity").value=data[0].jobcity;
				base.byId("jobtime").value=data[0].jobtime;
				base.byId("jobprice").value=data[0].jobprice;
				base.byId("remark").value=data[0].remark;
				base.byId("school").value=data[0].school;
				base.byId("major").value=data[0].major;
				base.byId("schooltime").value=data[0].schooltime;
			}
		},function(error){
			//alert("error:"+error);
		});
		
		base.byId("worklist").style.display="";
		base.byId("workedit").style.display="none";
		myservice.postdata("[{\"Type\":\"hr-work\",\"Rows\":[{\"id\":\"0\",\"userid\":\""+userid+"\",\"flag\":\"2\"}]}]",function(data){
			worklist(data);
		},function(error){
			//alert("error:"+error);
		});
		
		myservice.postdata("[{\"Type\":\"hr-skill\",\"Rows\":[{\"id\":\"0\",\"userid\":\""+userid+"\",\"flag\":\"2\"}]}]",function(data){
			skilllist(data);
		},function(error){
			//alert("error:"+error);
		});
		
		myservice.postdata("[{\"Type\":\"hr-interest\",\"Rows\":[{\"id\":\"0\",\"userid\":\""+userid+"\",\"flag\":\"2\"}]}]",function(data){
			interestlist(data);
		},function(error){
			//alert("error:"+error);
		});
	}
});

//定义Logo按钮事件
base.byId("logo").addEventListener('tap', function() {	
	//打开外部网页事件
	var url = "http://www.giant.cn";
	var isapp=false;
	mui.plusReady(function(){
		isapp=true;
		plus.runtime.openURL(url);
	});
	
	if(!isapp){
		window.open(url,'top')
		//window.location.target="_blank";
		//window.location.href=url;
	}
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
base.byId("previous").addEventListener('click', function() {
	pageInit("previous");
});

//定义下一页按钮事件
base.byId("next").addEventListener('tap', function() {
	pageInit("next");
});

//定义保存按钮事件
base.byId("save").addEventListener('tap', function() {
	if(base.byId("name").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“你的姓名”！");
		return;
	}
	if(base.byId("sex").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“你的性别”！");
		return;
	}
	if(base.byId("birth").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“出生日期”！");
		return;
	}
	if( base.byId("worktime").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“工作年限”！");
		return;
	}
	if( base.byId("education").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“最高学历”！");
		return;
	}
	/*if( base.byId("marry").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“婚姻状况”！");
		return;
	}*/
	if( base.byId("school").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“毕业院校”！");
		return;
	}
	if( base.byId("major").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“所学专业”！");
		return;
	}
	if( base.byId("schooltime").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“毕业时间”！");
		return;
	}
	if( base.byId("mobile").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“手机号码”！");
		return;
	}
	if( base.byId("email").value==""){
		divName="info";
		loaddiv();
		mui.toast("请填写“联系邮箱”！");
		return;
	}
	/*if( base.byId("jobname").value==""){
		divName="job";
		loaddiv();
		mui.toast("请填写“意向岗位”！");
		return;
	}
	if( base.byId("jobtype").value==""){
		divName="job";
		loaddiv();
		mui.toast("请填写“职业类型”！");
		return;
	}
	if( base.byId("jobcity").value==""){
		divName="job";
		loaddiv();
		mui.toast("请填写“意向城市”！");
		return;
	}
	if( base.byId("jobtime").value==""){
		divName="job";
		loaddiv();
		mui.toast("请填写“入职时间”！");
		return;
	}*/
	if( base.byId("jobprice").value==""){
		divName="job";
		loaddiv();
		mui.toast("请填写“薪资要求”！");
		return;
	}
	/*if( base.byId("remark").value==""){
		divName="person";
		loaddiv();
		mui.toast("请填写“自我评价”！");
		return;
	}*/
	
	var json="[{";
	json +="\"userid\":\""+userid+"\"";
	json +=",\"mobile\":\""+base.byId("mobile").value+"\"";
	json +=",\"name\":\""+base.byId("name").value+"\"";
	json +=",\"sex\":\""+base.byId("sex").value+"\"";
	json +=",\"birth\":\""+base.byId("birth").value+"\"";
	json +=",\"worktime\":\""+base.byId("worktime").value+"\"";	
	json +=",\"education\":\""+base.byId("education").value+"\"";
	json +=",\"marry\":\""+base.byId("marry").value+"\"";
	json +=",\"email\":\""+base.byId("email").value+"\"";
	json +=",\"jobname\":\""+base.byId("jobname").value+"\"";
	json +=",\"jobtype\":\""+base.byId("jobtype").value+"\"";
	json +=",\"jobcity\":\""+base.byId("jobcity").value+"\"";
	json +=",\"jobtime\":\""+base.byId("jobtime").value+"\"";
	json +=",\"jobprice\":\""+base.byId("jobprice").value+"\"";
	json +=",\"remark\":\""+base.byId("remark").value+"\"";
	json +=",\"school\":\""+base.byId("school").value+"\"";
	json +=",\"major\":\""+base.byId("major").value+"\"";
	json +=",\"schooltime\":\""+base.byId("schooltime").value+"\"";
	json +=",\"flag\":\"0\"";
	json +="}]";
	
	myservice.postdata("[{\"Type\":\"hr-user\",\"Rows\":"+json+"}]",function(data){
		userid = "";		
		base.byId("mobile").value="";
		base.byId("name").value="";
		base.byId("sex").value="";
		base.byId("birth").value="";
		base.byId("worktime").value="";
		base.byId("education").value="";
		base.byId("marry").value="";
		base.byId("email").value="";
		base.byId("jobname").value="";
		base.byId("jobtype").value="";
		base.byId("jobcity").value="";
		base.byId("jobtime").value="";
		base.byId("jobprice").value="";
		base.byId("remark").value="";
		base.byId("school").value="";
		base.byId("major").value="";
		base.byId("schooltime").value="";

		base.byId("worklist").style.display="none";
		base.byId("workedit").style.display="";
		base.byId("workstart").value="";
		base.byId("workend").value="";
		base.byId("workcompany").value="";
		base.byId("workjob").value="";		
		base.byId("workremark").value="";
		worklist(JSON.parse("[]"));
		skilllist(JSON.parse("[]"));
		interestlist(JSON.parse("[]"));

		mui.toast("您的简历已提交，谢谢！");
	},function(error){
		//alert("error:"+error);
	});
});

//基本信息
//定义性别选择事件
base.byId("sex").addEventListener('tap', function() {
	var dSex = '男';
	if(base.byId("sex").value!="") dSex=base.byId("sex").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "男",
	    text: "男"
	}, {
	    value: "女",
	    text: "女"
	}]);
	
	picker.pickers[0].setSelectedValue(dSex, 2000);
	picker.show(function(rs) {
		base.byId("sex").value =  rs[0].value;
		
		picker.dispose();
	});
});

//定义出生日期选择事件
base.byId("birth").addEventListener('tap', function() {
	var dDate = '1995-01-01 00:00';
	if(base.byId("birth").value!="") dDate=base.byId("birth").value;
	
	var options = JSON.parse('{"type":"date","beginYear":"1960","endYear":"2001","value":"'+dDate+'"}');
	var picker = new mui.DtPicker(options); 
	picker.show(function(rs) {
		base.byId("birth").value =  rs.value;
		
		picker.dispose();
	});
});

//定义工作年限选择事件
base.byId("worktime").addEventListener('tap', function() {
	var dWorktime = '无工作经验';
	if(base.byId("worktime").value!="") dWorktime=base.byId("worktime").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "无工作经验",
	    text: "无工作经验"
	},{
	    value: "1年",
	    text: "1年"
	},{
	    value: "2年",
	    text: "2年"
	},{
	    value: "3年",
	    text: "3年"
	},{
	    value: "4年",
	    text: "4年"
	},{
	    value: "5年",
	    text: "5年"
	},{
	    value: "6年",
	    text: "6年"
	},{
	    value: "7年",
	    text: "7年"
	},{
	    value: "8年",
	    text: "8年"
	},{
	    value: "9年",
	    text: "9年"
	},{
	    value: "10年",
	    text: "10年"
	},{
	    value: "10年以上",
	    text: "10年以上"
	}]);
	
	picker.pickers[0].setSelectedValue(dWorktime, 2000);
	picker.show(function(rs) {
		base.byId("worktime").value =  rs[0].value;
		
		picker.dispose();
	});
});

//定义最高学历选择事件
base.byId("education").addEventListener('tap', function() {
	var dValue = '初中及以下';
	if(base.byId("education").value!="") dValue=base.byId("education").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "初中及以下",
	    text: "初中及以下"
	},{
	    value: "高中",
	    text: "高中"
	},{
	    value: "中技",
	    text: "中技"
	},{
	    value: "中专",
	    text: "中专"
	},{
	    value: "大专",
	    text: "大专"
	},{
	    value: "本科",
	    text: "本科"
	},{
	    value: "硕士",
	    text: "硕士"
	},{
	    value: "博士",
	    text: "博士"
	},{
	    value: "MBA",
	    text: "MBA"
	}]);
	
	picker.pickers[0].setSelectedValue(dValue, 2000);
	picker.show(function(rs) {
		base.byId("education").value =  rs[0].value;
		
		picker.dispose();
	});
});

//定义婚姻状况选择事件
base.byId("marry").addEventListener('tap', function() {
	var dValue = '未婚';
	if(base.byId("marry").value!="") dValue=base.byId("marry").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "未婚",
	    text: "未婚"
	},{
	    value: "已婚",
	    text: "已婚"
	},{
	    value: "保密",
	    text: "保密"
	}]);
	
	picker.pickers[0].setSelectedValue(dValue, 2000);
	picker.show(function(rs) {
		base.byId("marry").value =  rs[0].value;
		
		picker.dispose();
	});
});

//定义毕业时间选择事件
base.byId("schooltime").addEventListener('tap', function() {
	var dDate = '1995-01-01 00:00';
	if(base.byId("schooltime").value!="") dDate=base.byId("birth").value;
	
	var options = JSON.parse('{"type":"date","beginYear":"2001","endYear":"2018","value":"'+dDate+'"}');
	var picker = new mui.DtPicker(options); 
	picker.show(function(rs) {
		base.byId("schooltime").value =  rs.value;
		
		picker.dispose();
	});
});

//求职意向
//定义职业类型选择事件
base.byId("jobtype").addEventListener('tap', function() {
	var dValue = '全职';
	if(base.byId("jobtype").value!="") dValue=base.byId("jobtype").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "全职",
	    text: "全职"
	},{
	    value: "兼职",
	    text: "兼职"
	},{
	    value: "实习",
	    text: "实习"
	}]);
	
	picker.pickers[0].setSelectedValue(dValue, 2000);
	picker.show(function(rs) {
		base.byId("jobtype").value =  rs[0].value;
		
		picker.dispose();
	});
});

//定义意向城市选择事件
base.byId("jobcity").addEventListener('tap', function() {
	var dValue = '南浔';
	if(base.byId("jobcity").value!="") dValue=base.byId("jobcity").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "南浔",
	    text: "南浔"
	},{
	    value: "上海",
	    text: "上海"
	}]);
	
	picker.pickers[0].setSelectedValue(dValue, 2000);
	picker.show(function(rs) {
		base.byId("jobcity").value =  rs[0].value;
		
		picker.dispose();
	});
});

//定义入职时间选择事件
base.byId("jobtime").addEventListener('tap', function() {
	var dValue = '随时到岗';
	if(base.byId("jobtime").value!="") dValue=base.byId("jobtime").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "随时到岗",
	    text: "随时到岗"
	},{
	    value: "1周内到岗",
	    text: "1周内到岗"
	},{
	    value: "1个月内到岗",
	    text: "1个月内到岗"
	},{
	    value: "3个月内到岗",
	    text: "3个月内到岗"
	},{
	    value: "到岗时间另议",
	    text: "到岗时间另议"
	}]);
	
	picker.pickers[0].setSelectedValue(dValue, 2000);
	picker.show(function(rs) {
		base.byId("jobtime").value =  rs[0].value;
		
		picker.dispose();
	});
});

//定义薪资要求选择事件
base.byId("jobprice").addEventListener('tap', function() {
	var dValue = '1000 ~ 2000';
	if(base.byId("jobprice").value!="") dValue=base.byId("jobprice").value;
	
	var picker = new mui.PopPicker();
	picker.setData([{
	    value: "1000 ~ 2000",
	    text: "1000 ~ 2000"
	},{
	    value: "2000 ~ 3000",
	    text: "2000 ~ 3000"
	},{
	    value: "3000 ~ 4000",
	    text: "3000 ~ 4000"
	},{
	    value: "4000 ~ 5000",
	    text: "4000 ~ 5000"
	},{
	    value: "5000 ~ 6000",
	    text: "5000 ~ 6000"
	},{
	    value: "6000 ~ 7000",
	    text: "6000 ~ 7000"
	},{
	    value: "7000 ~ 8000",
	    text: "7000 ~ 8000"
	},{
	    value: "8000 ~ 9000",
	    text: "8000 ~ 9000"
	},{
	    value: "9000 ~ 10000",
	    text: "9000 ~ 10000"
	},{
	    value: "薪资另议",
	    text: "薪资另议"
	}]);
	
	picker.pickers[0].setSelectedValue(dValue, 2000);
	picker.show(function(rs) {
		base.byId("jobprice").value =  rs[0].value;
		
		picker.dispose();
	});
});

//工作经验
var id = 0;
//定义开始时间选择事件
base.byId("workstart").addEventListener('tap', function() {
	var dDate = '2018-01-01 00:00';
	if(base.byId("workstart").value!="") dDate=base.byId("workstart").value;
	
	var options = JSON.parse('{"type":"date","beginYear":"1900","endYear":"2018","value":"'+dDate+'"}');
	var picker = new mui.DtPicker(options); 
	picker.show(function(rs) {
		base.byId("workstart").value =  rs.value;
		
		picker.dispose();
	});
});

//定义结束时间选择事件
base.byId("workend").addEventListener('tap', function() {
	var dDate = '2018-01-01 00:00';
	if(base.byId("workend").value!="") dDate=base.byId("workend").value;
	
	var options = JSON.parse('{"type":"date","beginYear":"1900","endYear":"2018","value":"'+dDate+'"}');
	var picker = new mui.DtPicker(options); 
	picker.show(function(rs) {
		base.byId("workend").value =  rs.value;
		
		picker.dispose();
	});
});

function worklist(data) {
	var table = document.body.querySelector('.work .mui-table-view');
	var cells = document.body.querySelectorAll('.work .mui-table-view .mui-table-view-cell');
	for (var i = 0; i < cells.length; i++) {
		table.removeChild(cells[i]); 
	}
	
	for (i = 0; i < data.length; i++) {
		userid = data[i].userid;
		
		var li = document.createElement('li'); 
		li.id = data[i].id;
		li.className = 'mui-table-view-cell';
		
		var listr =
			//'<div class="mui-slider-right mui-disabled">'+
			//'	<a id="more" class="mui-btn mui-btn-yellow mui-icon mui-icon-more"></a>'+
			//'	<a id="trash" class="mui-btn mui-btn-red mui-icon mui-icon-trash"></a>'+
			//'</div>'+
			'<div class="mui-slider-handle">';
		
		listr += 
			'	<h5 class="mui-ellipsis" style="color:blue;">' + (i+1) + '.'+data[i].workstart+' ~ '+data[i].workend+' '+'</h5>'+
			'	<h5 class="mui-ellipsis" style="color:blue;">' + data[i].workcompany+' '+data[i].workjob+'</h5>';
		listr += 
		    '   <p class="mui-h6 mui-ellipsis">'+data[i].workremark+'</p>'+
			'</div>';
			
		li.innerHTML = listr;
		table.appendChild(li); 
	}
	
	//单击打开详情页面
	$('#worklistview').on('tap', '.mui-slider-handle', function(event) {
		var elem = this;
		var li = elem.parentNode;
		
		id = li.id;

		var json="[{";
		json +="\"id\":\""+id+"\"";
		json +=",\"userid\":\""+userid+"\"";
		json +=",\"flag\":\"3\"";
		json +="}]";
		
		myservice.postdata("[{\"Type\":\"hr-work\",\"Rows\":"+json+"}]",function(data){
			for (i = 0; i < data.length; i++) {
				base.byId("workstart").value=data[i].workstart;
				base.byId("workend").value=data[i].workend;
				base.byId("workcompany").value=data[i].workcompany;
				base.byId("workjob").value=data[i].workjob;
				base.byId("workremark").value=data[i].workremark;
			}
			
			base.byId("workdelete").style.display="";
			base.byId("worklist").style.display="none";
			base.byId("workedit").style.display="";
		},function(error){
			//alert("error:"+error);
		});
	});
}


//定义新增按钮事件
base.byId("worknew").addEventListener('tap', function() {
	id=0;
	base.byId("workstart").value="";
	base.byId("workend").value="";
	base.byId("workcompany").value="";
	base.byId("workjob").value="";
	base.byId("workremark").value="";
	
	base.byId("workdelete").style.display="none";
	base.byId("worklist").style.display="none";
	base.byId("workedit").style.display="";
});

//定义保存按钮事件
base.byId("worksave").addEventListener('tap', function() {
	if(base.byId("workstart").value==""){
		mui.toast("请填写“开始时间”！");
		return;
	}
	if(base.byId("workend").value==""){
		mui.toast("请填写“结束时间”！");
		return;
	}
	if(base.byId("workcompany").value==""){
		mui.toast("请填写“公司名称”！");
		return;
	}
	if( base.byId("workjob").value==""){
		mui.toast("请填写“职位名称”！");
		return;
	}
	
	var json="[{";
	json +="\"id\":\""+id+"\"";
	json +=",\"userid\":\""+userid+"\"";
	json +=",\"workstart\":\""+base.byId("workstart").value+"\"";
	json +=",\"workend\":\""+base.byId("workend").value+"\"";
	json +=",\"workcompany\":\""+base.byId("workcompany").value+"\"";
	json +=",\"workjob\":\""+base.byId("workjob").value+"\"";
	json +=",\"workremark\":\""+base.byId("workremark").value+"\"";
	json +=",\"flag\":\"0\"";
	json +="}]";
	
	myservice.postdata("[{\"Type\":\"hr-work\",\"Rows\":"+json+"}]",function(data){
		worklist(data);
		
		id=0;
		base.byId("worklist").style.display="";
		base.byId("workedit").style.display="none";
	},function(error){
		//alert("error:"+error);
	});
});

//定义保存按钮事件
base.byId("workdelete").addEventListener('tap', function() {
	var json="[{";
	json +="\"id\":\""+id+"\"";
	json +=",\"userid\":\""+userid+"\"";
	json +=",\"flag\":\"1\"";
	json +="}]";
	
	myservice.postdata("[{\"Type\":\"hr-work\",\"Rows\":"+json+"}]",function(data){
		worklist(data);
		
		id=0;
		base.byId("worklist").style.display="";
		base.byId("workedit").style.display="none";
	},function(error){
		//alert("error:"+error);
	});
});

//定义关闭按钮事件
base.byId("workclose").addEventListener('tap', function() {
	base.byId("worklist").style.display="";
	base.byId("workedit").style.display="none";
});

//技能特长
function skilllist(data) {
	if(data.length>0) userid = data[0].userid;
	
	myservice.postdata("[{\"Type\":\"hr-label\",\"Rows\":[{\"userid\":\""+userid+"\",\"flag\":\"Skill\"}]}]",function(dataDefault){
		skilllabel(data,dataDefault);
	},function(error){
		//alert("error:"+error);
	});
}

function skilllabel(data,dataDefault) {
	var table = document.body.querySelector('.skilllabel');
	var cells = document.body.querySelectorAll('.skilllabel .mui-btn');
	for (var i = 0; i < cells.length; i++) {
		table.removeChild(cells[i]); 
	}
	
	for (i = data.length-1; i >= 0; i--) {
		var li = document.createElement('div'); 
		li.id = data[i].id;
		li.className = 'mui-btn mui-btn-primary mui-btn-outlined';

		li.innerHTML = data[i].name;
		li.style="margin:4px 4px 0px 0px;";
		table.appendChild(li); 
	}
	
	for (i = dataDefault.length-1; i >= 0; i--) {
		var li = document.createElement('div'); 
		li.id = 0;
		li.className = 'mui-btn mui-btn-outlined';
		
		li.innerHTML = dataDefault[i].name;
		li.style="margin:4px 4px 0px 0px;";
		table.appendChild(li); 
	}
	
	//单击打开详情页面
	$('#skilllabel').on('tap', '.mui-btn', function(event) {
		this.className="mui-btn mui-btn-primary mui-btn-outlined";
	});
}

//定义重选按钮事件
base.byId("skillreset").addEventListener('tap', function() {
	var table = document.body.querySelector('.skilllabel');
	var cells = document.body.querySelectorAll('.skilllabel .mui-btn');
	for (var i = 0; i < cells.length; i++) {
		cells[i].className="mui-btn mui-btn-outlined";
	}
});

//定义添加按钮事件
base.byId("skilladd").addEventListener('tap', function() {
	if(base.byId("skillname").value==""){
		mui.toast("请填写自定义名称！");
		return;
	}
	
	var json="[{";
	json +="\"id\":\"0\"";
	json +=",\"userid\":\""+userid+"\"";
	json +=",\"name\":\""+base.byId("skillname").value+"\"";
	json +=",\"flag\":\"0\"";
	json +="}]";
	
	myservice.postdata("[{\"Type\":\"hr-skill\",\"Rows\":"+json+"}]",function(data){
		skilllist(data);

		base.byId("skillname").value="";
	},function(error){
		//alert("error:"+error);
	});
});

//定义保存按钮事件
base.byId("skillsave").addEventListener('tap', function() {
	var table = document.body.querySelector('.skilllabel');
	var cells = document.body.querySelectorAll('.skilllabel .mui-btn');
	
	var json="[";
	for (var i = 0; i < cells.length; i++) {
		if(i>0)json +=",";
		
		json +="{";
		json +="\"id\":\""+cells[i].id+"\"";
		json +=",\"userid\":\""+userid+"\"";
		json +=",\"name\":\""+cells[i].innerHTML+"\"";
		
		if(cells[i].className=="mui-btn mui-btn-primary mui-btn-outlined"){
			json +=",\"flag\":\"0\"";
		}else{
			json +=",\"flag\":\"1\"";
		}
		
		json +="}";
	}
	json +="]";
	
	myservice.postdata("[{\"Type\":\"hr-skill\",\"Rows\":"+json+"}]",function(data){
		skilllist(data);
		mui.toast("保存成功！");
	},function(error){
		//alert("error:"+error);
	});
});

////兴趣爱好
function interestlist(data) {
	if(data.length>0) userid = data[0].userid;
	
	myservice.postdata("[{\"Type\":\"hr-label\",\"Rows\":[{\"userid\":\""+userid+"\",\"flag\":\"Interest\"}]}]",function(dataDefault){
		interestlabel(data,dataDefault);
	},function(error){
		//alert("error:"+error);
	});
}

function interestlabel(data,dataDefault) {
	var table = document.body.querySelector('.interestlabel');
	var cells = document.body.querySelectorAll('.interestlabel .mui-btn');
	for (var i = 0; i < cells.length; i++) {
		table.removeChild(cells[i]); 
	}
	
	for (i = data.length-1; i >= 0; i--) {
		var li = document.createElement('div'); 
		li.id = data[i].id;
		li.className = 'mui-btn mui-btn-primary mui-btn-outlined';

		li.innerHTML = data[i].name;
		li.style="margin:4px 4px 0px 0px;";
		table.appendChild(li); 
	}
	
	for (i = dataDefault.length-1; i >= 0; i--) {
		var li = document.createElement('div'); 
		li.id = 0;
		li.className = 'mui-btn mui-btn-outlined';
		
		li.innerHTML = dataDefault[i].name;
		li.style="margin:4px 4px 0px 0px;";
		table.appendChild(li); 
	}
	
	//单击打开详情页面
	$('#interestlabel').on('tap', '.mui-btn', function(event) {
		this.className="mui-btn mui-btn-primary mui-btn-outlined";
	});
}

//定义重选按钮事件
base.byId("interestreset").addEventListener('tap', function() {
	var table = document.body.querySelector('.interestlabel');
	var cells = document.body.querySelectorAll('.interestlabel .mui-btn');
	for (var i = 0; i < cells.length; i++) {
		cells[i].className="mui-btn mui-btn-outlined";
	}
});

//定义添加按钮事件
base.byId("interestadd").addEventListener('tap', function() {
	if(base.byId("interestname").value==""){
		mui.toast("请填写自定义名称！");
		return;
	}
	
	var json="[{";
	json +="\"id\":\"0\"";
	json +=",\"userid\":\""+userid+"\"";
	json +=",\"name\":\""+base.byId("interestname").value+"\"";
	json +=",\"flag\":\"0\"";
	json +="}]";
	
	myservice.postdata("[{\"Type\":\"hr-interest\",\"Rows\":"+json+"}]",function(data){
		interestlist(data);

		base.byId("interestname").value="";
	},function(error){
		//alert("error:"+error);
	});
});

//定义保存按钮事件
base.byId("interestsave").addEventListener('tap', function() {
	var table = document.body.querySelector('.interestlabel');
	var cells = document.body.querySelectorAll('.interestlabel .mui-btn');
	
	var json="[";
	for (var i = 0; i < cells.length; i++) {
		if(i>0)json +=",";
		
		json +="{";
		json +="\"id\":\""+cells[i].id+"\"";
		json +=",\"userid\":\""+userid+"\"";
		json +=",\"name\":\""+cells[i].innerHTML+"\"";
		
		if(cells[i].className=="mui-btn mui-btn-primary mui-btn-outlined"){
			json +=",\"flag\":\"0\"";
		}else{
			json +=",\"flag\":\"1\"";
		}
		
		json +="}";
	}
	json +="]";
	
	myservice.postdata("[{\"Type\":\"hr-interest\",\"Rows\":"+json+"}]",function(data){
		interestlist(data);
		mui.toast("保存成功！");
	},function(error){
		//alert("error:"+error);
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
	pageInit("next");
},function(){
	//触发上一页按钮事件
	pageInit("previous");
});