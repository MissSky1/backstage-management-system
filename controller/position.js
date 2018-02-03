const positionModal = require("../models/position.js")

module.exports = {
	addPosition(req, res) {
		const { company, position, salary, address} = req.body;
		const filename = req.file ? req.file.filename : "";
		positionModal.addPosition( company, position, salary, address, filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted : !err
				}
			})
		})
	},
	getPositionList(req, res) {
		const { params, page, size } = req.query;
		let totalPage;
		positionModal.getPosition(params, (result) => {
			if( result && result !== "error" ){
				totlaPage = Math.ceil(result.length / size)
				positionModal.getPositionPage(params, page, size, (result) => {
					res.json({
						ret: true,
						data: {
							list: (result && result !== "error") ? result : false,
							totalPage: totlaPage
						}
					})
				})
			}
		})
	},
	removePosition(req, res) {
		positionModal.removePositionById(req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}
			})
		})
	},
	getPositionInfo(req, res) {
		positionModal.getPositionInfoById(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					info: (result && result !== "error") ? result : false
				}
			})
		})
	},
	updatePosition(req, res) {
		const { company, position, salary, address, id } = req.body;		
		const params = {
			company: company,
			position: position,
			salary: salary,
			address: address
		}

		if(req.file && req.file.filename) {
			params.filename = req.file.filename;
		}
		console.log(company, position, salary, address, id,params)
		positionModal.updatePositionById(id, params, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? result : false
				}
			})
		})
	},
	getFilterCompany(req, res) {
		const {params, page, size } = req.query;
		positionModal.getFilterCompanyBySalary( params, (result) => {
			var filterTotal = Math.ceil(result.length / size) ;
			positionModal.getPositionPage(params, page, size, (result) => {
				res.json({
					ret: true,
					data: {
						filterList: (result && result !== "error") ? result : "",
						filterTotal: filterTotal
					}
				})
			})
		})
	},
}