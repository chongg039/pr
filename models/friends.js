var mongodb = require('./mongodb');

var friendsSchema = new mongodb.mongoose.Schema({
    following: Array,//关注
    followed: Array//被关注
}, {
    collection: 'friends'
});

var friendsModel = mongodb.mongoose.model('Friends', friendsSchema);

function Friends(friends) {
    this.following = friends.following;
    this.followed = friends.followed;
};

Friends.prototype.save = function(callback){
	var friends = {
        following: this.following,
    	followed: this.followed
    }

	var newFriends = new friendsModel(friends); 
	newFriends.save(function (err, user) {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
}

module.exports = Friends;