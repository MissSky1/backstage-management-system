var mongoose = require("../utils/database.js")

var Person = mongoose.model('person', { 
	username: String,
	age: String,
	sex: String,
	address: String,
	education: String,
	workExp: String,
	salary: String,
	filename: String
});

module.exports = {
	addPerson: function(username, age, sex, address, education, workExp, salary, filename, cb) {
		var person = new Person({ username, age, sex, address, education, workExp, salary, filename });
		person.save( (err) => {
			cb(err)
		})
	},
	getPersonList: function(params, cb) {
		Person.find(params).then((result) => {
			cb(result);
		}).catch(() => {
			cb("error");
		})
	},
	getPersonListByPage: function(params, page, size, cb) {
		page = parseInt(page, 10);
		size = parseInt(size, 10);
		Person.find(params).skip((page-1)*size).limit(size).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	},
	deletePersonById: function(id, cb) {
		Person.findByIdAndRemove(id, (err) => {
			cb(err)
		})
	},
	getPersonInfoById: function(id, cb) {
		Person.findById(id).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	},
	updatePersonById: function(id, params, cb) {
		Person.findByIdAndUpdate(id, params).then((result) => {
			cb(result)
		}).catch(() => {
			cb("error")
		})
	},
	filterPersonBySalary: function(params, cb) {
		Person.find(params, (err,result) => {
			cb(result)
		})
	},
}