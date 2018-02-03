const personModal = require("../models/person.js");

module.exports = {
	addPerson(req, res) {
		const { username, age, sex, address, education, workExp, salary } = req.body;
		const filename = req.file ? req.file.filename : "";
		personModal.addPerson( username, age, sex, address, education, workExp, salary, filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted: !err
				}
			})
		})
	},
	getPersonList(req, res) {
		const { params, page, size } = req.query;
		personModal.getPersonList(params, (result) => {
			totalPage = Math.ceil(result.length / size)
			personModal.getPersonListByPage( params, page, size, (result) => {
				res.json({
					ret: true,
					data: {
						list: (result && result !== "error") ? result : "",
						totalPage: totalPage
					}
				})
			})
		})
	},
	deletePerson(req, res) {
		personModal.deletePersonById(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}
			})
		})
	},
	getPersonInfo(req, res) {
		personModal.getPersonInfoById(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					info: (result && result !== "error") ? result : false
				}
			})
		})
	},
	UpdatePerson(req, res) {
		const { username, age, sex, address, education, workExp, salary, id } = req.body;
		const params = {
			username, 
			age, 
			sex, 
			address, 
			education, 
			workExp, 
			salary
		};
		if( req.file && req.file.filename ) {
			params.filename = req.file.filename;
		};
		personModal.updatePersonById( id, params, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? result : false
				}
			})
		})
	},
	filterPersonBySalary(req, res) {
		const { salary, page, size } = req.query;
		personModal.filterPersonBySalary({salary: salary}, (result) => {
			totalPageBySalary = Math.ceil(result.length / size )
			personModal.getPersonListByPage( {salary: salary}, page, size, (result) => {
				res.json({
					ret: true,
					data: {
						filterBySalary: (result) ? result : flase,     //请求两次？？？？？
						totalPage: totalPageBySalary
					}
				})
			})				
		})
	}
}