var mongoose = require("../utils/database.js")

var Position = mongoose.model('position', { 
	company: String,
	position: String,
	salary: String,
	address: String,
	filename: String
});


module.exports = {
	addPosition: function( company, position, salary, address, filename, cb ){
		var position = new Position({ 
			company: company,
			position: position,
			salary: salary,
			address: address,
			filename: filename
		});
		position.save(function(err){
			cb(err)
		});
	},
	getPosition: function( params, cb ) {
		Position.find(params).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	},
	getPositionPage: function( params, page, size, cb ) {
		var page = parseInt(page, 10);
		var size = parseInt(size, 10);
		Position.find(params).skip((page-1)*size).limit(size).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	},
	removePositionById: function( id, cb ) {
		Position.findByIdAndRemove( id, (err) => {
			cb(err)
		})
	},
	getPositionInfoById: function(id, cb) {
		Position.findById(id).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	},
	updatePositionById: function(id, params, cb) {
		Position.findByIdAndUpdate(id, params).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	},
	getFilterCompanyBySalary: function(params, cb) {
		Position.find(params, (err, result) => {
			cb(result)
		})
	},
}