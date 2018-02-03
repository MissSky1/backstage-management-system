function FiltrateCompany(container) {
	this.container = container;
	this.page = 1;
	this.size = 5;
	this.init();
}

FiltrateCompany.ModalTemp = `
<div class="modal fade" id="filterCpyModal" tabindex="-1" role="dialog" aria-labelledby="addPerModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="addPerModalLabel">筛选工作</h4>
      </div>
	  <div style="padding:0 20px">  
	      <table class="table" style = "margin-top:20px">
			<thead>
				<tr>
					<th>序号</th>
					<th>公司</th>
					<th>职位</th>
					<th>薪资</th>
					<th>地址</th>
					<th>logo</th>
				</tr>
			</thead>
			<tbody class="js-tbody"></tbody>
		  </table>
	  </div> 
	  <div class="container">	
		<nav aria-label="Page navigation">
		  <ul class="pagination filter-pagination">
		  </ul>
		</nav>
	  </div>
	  <div style = "padding : 0 18px">   
	      <div class="alert alert-success hide js-suss-notice" role="alert">恭喜您，添加成功</div>
	  </div> 
    </div>
  </div>
</div>
`

$.extend(FiltrateCompany.prototype, {
	init: function() {
		this.createDom();
	},
	createDom: function() {
		this.modal = $(FiltrateCompany.ModalTemp);
		this.TableElem = this.modal.find(".js-tbody");
		this.container.append(this.modal)
	},
	getFilterCompany: function(salary) {
		$.ajax({
			url: "/api/getFilterCompany",
			data: {
				params: {salary: salary},
				page: 1,
				size: 5
			},
			success: $.proxy(this.handleFilterSucc, this)
		})
	},
	handleFilterSucc: function(res) {
		if(res && res.data && res.data.filterList) {
			this.createItems(res.data.filterList);
			$(this).trigger($.Event("FilterCpyChange", {
				filterTotal: res.data.filterTotal,
				filterContainer: this.modal.find(".filter-pagination")
			}))
		}
	},
	createItems: function(list) {
		var str = "";
		for(var i = 0 ; i < list.length; i++) {
			var Item = list[i];
			var file = Item.filename ? Item.filename : "1515142229968p8.jpg"
			str += `<tr>
						<td>${i+1}</td>
						<td>${Item.company}</td>
						<td>${Item.position}</td>
						<td>${Item.salary}</td>
						<td>${Item.address}</td>
						<td><img src="/uploads/${file}" style="width:30px;height:26px"></td>
					</tr>`
		};
		this.TableElem.html(str);
	}
})