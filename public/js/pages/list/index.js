function Page() {
	this.init();
}


$.extend(Page.prototype, {
	init: function(){
		this.createHeader();
		this.createAddPosition();
		this.createPositionList();
		this.createPagination()
	},
	createHeader: function() {
		this.headerContainer = $(".js-header");
		this.header = new Header(this.headerContainer,1);
	},
	createAddPosition: function() {
		this.positionContainer = $(".js-container");
		this.addPosition = new AddPosition(this.positionContainer);
		$(this.addPosition).on("change", $.proxy(this.handleAddPositionSucc, this));
	},
	createPositionList: function() {
		this.positionContainer = $(".js-container");
		this.positionList = new PositionList(this.positionContainer);
		$(this.positionList).on("change", $.proxy(this.handleListChange, this));
	},
	createPagination: function() {
		this.paginationContainer = $(".js-pagination");
		this.pagination = new Pagination(this.paginationContainer);
		$(this.pagination).on("change", $.proxy(this.handlePaginationChange, this));
	},
	handleListChange: function(e) {
		this.pagination.setTotal(e.totalPage);
	},
	handlePaginationChange: function(e) {
		this.positionList.changePage(e.page);
	},
	handleAddPositionSucc: function() {
		this.positionList.getListInfo();
	}
})