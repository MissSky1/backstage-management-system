function PersonList(container) {
	this.container = container;
	this.page = 1;
	this.size = 10;
	this.init()
}

PersonList.Temp = `
<table class="table" style="margin-top:20px">
  <thead>
  	<th>序号</th>
  	<th>头像</th>
  	<th>姓名</th>
  	<th>年龄</th>
  	<th>性别</th>
  	<th>地址</th>
  	<th>学历</th>
  	<th>工作经验</th>
  	<th>期望薪资</th>
  	<th>筛选工作</th>
  	<th>操作</th>
  </thead>
  <tbody class="js-tbody"></tbody>
</table>
`

$.extend(PersonList.prototype, {
	init: function() {
		this.createDom();
		this.bindEvents();
		this.getListInfo();
		this.createUpdatePerson();
		this.createFilterCompany();
	},
	createDom: function() {
		this.modal = $(PersonList.Temp);
		this.tableElem = this.modal.find(".js-tbody");
		this.container.append(this.modal);
	},
	bindEvents: function() {
		this.container.on("click", $.proxy(this.handleTableClick, this))
	},
	handleTableClick: function(e) {
		var target = $(e.target);
		var isDelete = target.hasClass("js-delete");
		var isUpdate = target.hasClass("js-update");
		var isFilter = target.hasClass("js-filter");
		if( isDelete ) {
			this.deletePerson(target.data("id"))
		};
		if( isUpdate ) {
			this.updatePerson.showItem(target.data("id"))
		};
		if( isFilter ) {
			this.filtrateCompany.getFilterCompany(target.data("salary"));
		}
	},
	deletePerson: function(id) {
		$.ajax({
			url: "/api/deletePerson",
			data: {
				id: id
			},
			success: $.proxy(this.handleDeleteSucc, this)
		})
	},
	handleDeleteSucc: function(res) {
		if(res && res.data && res.data.delete) {
			var params = {};
			this.getListInfo(params);
		}
	},
	getListInfo: function(params) {
		$.ajax({
			type: "GET",
			url: "/api/getPersonList",
			data: {
				params: params,
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleGetPersonSucc, this)
		})
	},
	createUpdatePerson: function() {
		this.updatePerson = new UpdatePerson(this.container);
		$(this.updatePerson).on("change", $.proxy(this.getListInfo, this))
	},
	handleGetPersonSucc: function(res) {
		if(res && res.data && res.data.list) {
			this.createItems(res.data.list);
			if(this.page > res.data.totalPage) {
				this.page = res.data.totalPage;
				this.getListInfo()
			};
			$(this).trigger(new $.Event("change", {
				totalPage: res.data.totalPage
			}));
		}
	},
	createItems: function(list) {
		var str = "";
		for(var i = 0 ; i < list.length; i++) {
			var Item = list[i];
			var file = Item.filename ? Item.filename : "1515142229968p8.jpg"
			str += `<tr>
						<td>${i+1}</td>
						<td><img src="/uploads/${file}" style="width:30px;height:26px"></td>
						<td>${Item.username}</td>
						<td>${Item.age}</td>
						<td>${Item.sex}</td>
						<td>${Item.address}</td>
						<td>${Item.education}</td>
						<td>${Item.workExp}</td>
						<td>${Item.salary}</td>
						<td><button type="button" class="btn btn-info js-filter" data-salary="${Item.salary}" data-toggle="modal" data-target="#filterCpyModal">筛选</button></td>
						<td>
							<span class="js-update" data-id="${Item._id}">修改</span>
							<span class="js-delete" data-id="${Item._id}">删除</span>
						</td>
					</tr>`
		}
		this.tableElem.html(str);
	},
	changePage: function(page,params) {
		this.page = page;
		this.params = params;
		this.getListInfo(this.params)
	},
	createFilterCompany: function() {
		this.filtrateCompany = new FiltrateCompany(this.container);
		$(this.filtrateCompany).on("FilterCpyChange", $.proxy(this.handleFilterCpyChange, this))
	},
	handleFilterCpyChange: function(e) {
		$(this).trigger($.Event("FilterCpyChange", {
			filterTotal: e.filterTotal,
			filterContainer: e.filterContainer
		}))
	}
})