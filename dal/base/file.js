file = {};

//初始化下载对象
file.createDownload = function(url, filename, fnSuc, fnErr){
    //判断文件是否已经下载
	plus.io.resolveLocalFileSystemURL(filename, function(entry){
        if(entry.isFile){
            if(fnSuc) fnSuc('文件已经存在!');
        }else{
        	file.download(url, filename, function(result){
	    		if(fnSuc) fnSuc(result);
	    	},function(error){
	    		if(fnErr) fnErr(error);
	    	});
        }
    },function(e){
    	file.download(url, filename, function(result){
    		if(fnSuc) fnSuc(result);
    	},function(error){
    		if(fnErr) fnErr(error);
    	});
    });
};

var dtask = null;
file.download = function(url, filename, fnSuc, fnErr){
	if(dtask){
	    //mui.toast('下载任务已经存在');
	    if(fnErr) fnErr('下载任务已经存在');
	}else{
		dtask = plus.downloader.createDownload(url ,{method:'GET',filename:filename}, function(d,status){
		    //mui.toast(d.filename);
		});
		
		dtask.addEventListener("statechanged",function(task,status){
		    if(!dtask){
		    	if(fnErr) fnErr('下载任务不存在，无法判断是否已完成');
		    }else{
		    	switch(task.state){
		        case 1:
		        	//开始
		        	mui.toast('开始下载...');
		        	break;
		        case 2:
		        	//链接到服务器
		        	mui.toast('链接到服务器...');
		        	break;
		        case 3:
		            var progressVal = (task.downloadedSize/task.totalSize)*100;
		            //mui('#bar').progressbar({progress:progressVal}).show();
		            mui.toast('正在下载...：'+progressVal);
		            break;
		        case 4: 
		        	mui.toast('下载完成');
		        	if(fnSuc) fnSuc('文件下载完成');
		        	break;
		        }
		    }
	    });
	    
	    dtask.start();
	}
};

file.save = function(data, filename, fnSuc, fnErr){
	plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs){
		fs.root.getFile(filename,{create:true}, function(fileEntry){
			fileEntry.createWriter(function(fileWriter) {
			    fileWriter.write(data);
			    fnSuc();
			});
		},function(e){
			console.log("file.save failed: " + e.message);
			if(fnErr) fnErr("file.save failed: " + e.message);
		});
	}, function(e){
		console.log("file.save failed: " + e.message);
		if(fnErr) fnErr("file.save failed: " + e.message);
	});
};

file.read = function(filename, fnSuc, fnErr){
	plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs){
		fs.root.getFile(filename,{create:true}, function(fileEntry){
			fileEntry.file(function(file){		
				//console.log(file.fullPath);
				var fileReader = new plus.io.FileReader();
				fileReader.readAsText(file, 'utf-8');
				fileReader.onloadend = function(evt) {
					fnSuc(evt.target.result);
				}
			});
		},function(e){
			console.log("file.read failed: " + e.message);
			if(fnErr) fnErr("file.read failed: " + e.message);
		});
	}, function(e){
		console.log("file.read failed: " + e.message);
		if(fnErr) fnErr("file.read failed: " + e.message);
	});
};