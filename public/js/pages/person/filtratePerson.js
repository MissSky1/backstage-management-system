function FiltratePerson(container) {
	this.container = container;
	this.page = 1;
	this.size = 10;
	this.salaryCount = 1;
	this.init();
}

FiltratePerson.BtnTemp = `
<div class="btn-group" style="margin-left:20px">
  <button type="button" class="btn btn-primary">薪资筛选</button>
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu">
    <li><a href="#">5k-10k</a></li>
    <li><a href="#">10k-15k</a></li>
    <li><a href="#">15k-20k</a></li>
    <li><a href="#">20k-25k</a></li>
    <li><a href="#">25k-30k</a></li>
    <li><a href="#">30k-35k</a></li>
    <li><a href="#">35以上</a></li>
  </ul>
</div>
`


$.extend(FiltratePerson.prototype, {
	init: function() {
		this.createBtn();
		this.bindEvents()
	},
	createBtn: function() {
		this.btn = $(FiltratePerson.BtnTemp);
		this.container.append(this.btn);
	},
	bindEvents: function() {
		this.menu = $(".dropdown-menu");
		this.menu.on("click", $.proxy(this.handleMenuClick, this))
	},
	handleMenuClick: function(e) {
		var target = $(e.target);
		$(this).trigger($.Event("change", {
			params: {salary: target.text() },
			page: this.page,
			size: this.size,
			salaryCount: this.salaryCount
		}))
	},
})