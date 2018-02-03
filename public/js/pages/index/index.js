function Page() {
	this.init();
}


$.extend(Page.prototype, {
	init: function(){
		this.createHeader();
	},
	createHeader: function() {
		this.headerContainer = $(".js-header")
		this.header = new Header(this.headerContainer,0)
	}
})