var mongoose = require("../utils/database.js")

var User = mongoose.model('user', { 
	username: String,
	password: String
});


module.exports = {
	register: function( username, password, cb ){
		var user = new User({ 
			username: username,
			password: password 
		});
		user.save(function(err){
			cb(err)
		});
	},
	findUser: function( params, cb ){
		User.findOne(params).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	}
}