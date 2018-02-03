function Pagination(container) {
	this.container = container;
	this.bindEvents()
}

$.extend(Pagination.prototype, {
	setTotal: function(totalPage) {
		var str = "";
		for(var i = 1 ; i <= totalPage; i++) {
			str += 	`<li><a href="javascript:;">${i}</a></li>`;
		}
		this.container.html(str)
	},
	bindEvents: function() {
		this.container.on("click", $.proxy(this.handleClick, this))
	},
	handleClick: function(e) {
		var target = $(e.target);
		$(this).trigger(new $.Event("filterChange", {
			page: parseInt(target.text())
		}));
		$(this).trigger(new $.Event("filterPageChange", {
			page: parseInt(target.text())
		}))
	},
})