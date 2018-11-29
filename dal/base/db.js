// web sql
db = {};

//创建本地数据库
db.database = function(name, size){
	try{
		var db_name = name ? name : 'db_myapp';
		var db_size = size ? size : 2;
		
		return openDatabase(db_name, '1.0', 'db_myapp', db_size * 1024 * 1024);
	}catch(e){
		console.log("db.database:"+e.message);
		mui.toast("db.database:"+e.message);
	}
};

var database = db.database();

//更新数据
db.update = function(sql, func, fune){
	try{
		if(database){
			database.transaction(function(tx){
				//tx.executeSql(sql);
				tx.executeSql(sql, [], function(tx, results) {
					if(func){
						func(results.rowsAffected);
					}
				}, function(error){
					if(fune){
						fune(error);
					}
				});
			});
		}
	}catch(e){
		console.log("db.update:"+e.message);
		mui.toast("db.update:"+e.message);
	}	
};

//查询数据
db.query = function(sql, func, fune){
	try{
		if(database && sql){
			database.transaction(function(tx){
				tx.executeSql(sql, [], function(tx, results) {
					func(results);
				}, function(error){
					if(fune){
						fune(error);
					}
				});
			});
		}
	}catch(e){
		console.log("db.query:"+e.message);
		mui.toast("db.query:"+e.message);
		if(fune){
			fune("db.query:"+e.message);
		}
	}	
};

//查询数据,如存在记录则执行sql_update,否则执行sql_insert
db.updateByCondition = function(sql, sql_update, sql_insert, func, fune){
	try{
		db.query(sql, function(res){
			var sql_temp=sql_update;
			if(res.rows.length<=0){
				sql_temp=sql_insert;
			}
			
			db.update(sql_temp, function(res2){
				func(res2);
			}, function(error){
				if(fune){
					fune(error);
				}
			});
		}, function(error){
			if(fune){
				fune(error);
			}
		});
	}catch(e){
		console.log("db.query:"+e.message);
		mui.toast("db.query:"+e.message);
	}	
};

db.inittable = function(isdrop){
	try{
		if(isdrop) db.update('drop table sys_user'); 
		db.update('create table if not exists sys_user (id integer primary key,userid,username,password,activity_flag,update_date)');
		
		if(isdrop) db.update('drop table sys_pages'); 
		db.update('create table if not exists sys_pages (id,page_title,page_name,page_path,page_sort,is_index,is_default,is_js,update_date,last_date,flag)');
		//console.log("db.inittable success");
	}catch(e){
		console.log("db.inittable:"+e.message);
		mui.toast("db.inittable:"+e.message);
	}
};
db.inittable(false);
