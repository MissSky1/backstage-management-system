function PositionList(container) {
	this.container = container;
	this.page = 1;
	this.size = 10;
	this.init();
}

PositionList.Temp = `
<table class="table" style = "margin-top:20px">
	<thead>
		<tr>
			<th>序号</th>
			<th>公司</th>
			<th>职位</th>
			<th>薪资</th>
			<th>地址</th>
			<th>logo</th>
			<th>操作</th>
		</tr>
	</thead>
	<tbody class="js-tbody"></tbody>
</table>
`

$.extend(PositionList.prototype, {
	init: function() {
		this.createDom();
		this.createUpdatePosition()
		this.bindEvents()
		this.getListInfo();
	},
	createDom: function() {
		this.element = $(PositionList.Temp);
		this.container.append(this.element)
	},
	createUpdatePosition: function() {
		this.updatePosition = new UpdatePosition(this.container);
		$(this.updatePosition).on("change", $.proxy(this.getListInfo, this));
	},
	bindEvents: function() {
		this.container.on("click", $.proxy(this.handleTableClick, this))
	},
	handleTableClick: function(e) {
		var target = $(e.target);
		var isDelete = target.hasClass("js-delete");
		var isUpdate = target.hasClass("js-update");
		if(isDelete) {
			this.deleteItem(target.data("id"))
		}
		if(isUpdate) {
			this.updatePosition.showItem(target.data("id"))
		}
	},
	deleteItem: function(id) {
		$.ajax({
			url: "/api/removePosition",
			data: {
				id: id
			},
			success: $.proxy(this.handleDeleteSucc, this)
		})
	},
	handleDeleteSucc: function(res) {
		if(res && res.data && res.data.delete) {
			var params = {};
			this.getListInfo(params)
		}
	},
	getListInfo: function(params) {
		$.ajax({
			type: "GET",
			url: "/api/getPositionList",
			data: {
				params: params,
				page: this.page,
				size: this.size
			},
			success: $.proxy(this.handleGetListSucc, this)
		})
	},
	handleGetListSucc: function(res) {
		if(res && res.data && res.data.list) {
			this.createItems(res.data.list)
			if( this.page > res.data.totalPage ) {
				this.page = res.data.totalPage;
				this.getListInfo()
			}
			$(this).trigger(new $.Event("change", {
				totalPage: res.data.totalPage
			}))
		}
	},
	createItems: function(list) {
		this.itemsContainer = this.element.find(".js-tbody")
		var str = "";
		for(var i = 0 ; i < list.length; i++) {
			var item = list[i];
			var file = item.filename ? item.filename : "15151337647098.jpg"
			str += `<tr>
						<td>${i+1}</td>
						<td>${item.company}</td>
						<td>${item.position}</td>
						<td>${item.salary}</td>
						<td>${item.address}</td>
						<td><img src="/uploads/${file}" style="width:30px;height:26px"></td>
						<td>
							<span class="js-update" data-id="${item._id}">修改</span>
							<span class="js-delete" data-id="${item._id}">删除</span>
						</td>
					</tr>`
		}
		this.itemsContainer.html(str)
	},
	changePage: function(page) {
		this.page = page
		this.getListInfo()
	}
})
