var FriendUtil = function(name,ask){
	this.name=name;
	this.ask=ask;
}
FriendUtil.prototype.setName=function(name){
	this.name=name;
}
FriendUtil.prototype.setAsk=function(ask){
	this.ask=ask;
}
FriendUtil.prototype.getFriends=function(db,collection,callback){
	var query={name:this.name};
	db.collection(collection,function(err, collection) {
        collection.find(query,{friends:1,_id:0}).toArray(function(err,docs){
        	callback(docs);
        });    
    });
}
FriendUtil.prototype.getRequests=function(db,collection,callback){
	var query={name:this.name};
	db.collection(collection,function(err, collection) {
        collection.find(query,{requests:1,_id:0}).toArray(function(err,docs){
        	callback(docs);
        });    
    });
}
FriendUtil.prototype.askAdd=function(db,collection){
	var query={name:this.ask};
	var request={requests:this.name};
	db.collection(collection,function(err, collection) {
        collection.update(query,{$push:request},{upsert:true}, function(err, docs) {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}
FriendUtil.prototype.agreeRequest=function(db,collection){
	var query={name:this.name};
	var askquery={name:this.ask};
	var request={requests:this.ask};
	var friend={friends:this.ask};
	var askfriend={friends:this.name};
	console.log(query);
	db.collection(collection,function(err, collection) {
        collection.update(query,{$pull:request,$push:friend},{upsert:true},function(err, docs) {
            if (err) {
                console.log(err);
                return;
            }
            collection.update(askquery,{$push:askfriend},{upsert:true},function(err, docs) {
            	if (err) {
                	console.log(err);
                	return;
            	}

       		});
        });
    });
}
FriendUtil.prototype.deleteFriend=function(db,collection){
	var query={name:this.name};
	var askquery={name:this.ask};
	var friend={friends:this.ask};
	var askfriend={friends:this.name};
	console.log(query);
	db.collection(collection,function(err, collection) {
        collection.update(query,{$pull:friend},function(err, docs) {
            if (err) {
                console.log(err);
                return;
            }
        });
        collection.update(askquery,{$pull:askfriend},function(err, docs) {
            if (err) {
                console.log(err);
                return;
            }
         
        });
    });
}
FriendUtil.prototype.denyRequest=function(db,collection){
	var query={name:this.name};
	var request={requests:this.ask};
	db.collection(collection,function(err, collection) {
        collection.update(query,{$pull:request},function(err, docs) {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}
var friendUtil=new FriendUtil();
module.exports=friendUtil;