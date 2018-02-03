function Page() {
	this.init();
}


$.extend(Page.prototype, {
	init: function(){
		this.createHeader();
		this.createAddPerson();
		this.createFiltratePerson();
		this.createpersonList();
		this.createPagination();
	},
	createHeader: function() {
		this.headerContainer = $(".js-header")
		this.header = new Header(this.headerContainer,2)
	},
	createAddPerson: function() {
		this.addPersonContainer = $(".js-container");
		this.addPerson = new AddPerson(this.addPersonContainer);
		$(this.addPerson).on("change", $.proxy(this.handleAddSucc, this))
	},
	createFiltratePerson: function() {
		this.filtratePerson = new FiltratePerson(this.addPersonContainer);
		$(this.filtratePerson).on("change", $.proxy(this.handleFilterSucc, this))
	},
	createpersonList: function() {
		this.personListContainer = $(".js-container");
		this.personList = new PersonList(this.personListContainer);
		$(this.personList).on("change", $.proxy(this.handleListChange, this));
		$(this.personList).on("FilterCpyChange", $.proxy(this.handleFilterCpyChange, this))
	},
	createPagination: function() {
		this.paginationContainer = $(".js-pagination");
		this.pagination = new Pagination(this.paginationContainer);
		$(this.pagination).on("change", $.proxy(this.handlePageChange, this));
		$(this.pagination).on("filterChange", $.proxy(this.handleFilterPageChange, this));
	},
	handleAddSucc: function() {
		this.personList.getListInfo()
	},
	handleListChange: function(e) {
		this.pagination.setTotal(e.totalPage)
	},
	handlePageChange: function(e) {
		this.personList.changePage(e.page);
	},
	handleFilterSucc: function(e) {
		this.personList.getListInfo(e.params);
		this.params = e.params;
	},
	handleFilterPageChange: function(e) {
		this.personList.changePage(e.page,this.params)
	},
	handleFilterCpyChange: function(e) {
		this.filterPagination = new Pagination(e.filterContainer)
		this.filterPagination.setTotal(e.filterTotal);
		$(this.filterPagination).on("filterPageChange", this.handleFilterChangePage, this)
	},
})