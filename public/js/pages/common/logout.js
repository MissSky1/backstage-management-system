function Logout(container) { 
	this.container = container;
	this.init();
}

Logout.BtnTemp = `<li><a href="#" data-toggle="modal" data-target="#LogoutModal">退出登录</a></li>`

$.extend(Logout.prototype, {
	init: function() {
		this.createBtn();
		this.bindEvents()
	},
	createBtn: function() {
		this.btn = $(Logout.BtnTemp);
		this.container.append(this.btn)
	},
	bindEvents: function() {
		this.btn.on("click",$.proxy(this.handleClick, this));
	},
	handleClick: function() {
		$.ajax({
			type: "GET",
			url: "/api/logout",
			success: $.proxy(this.handleLogoutSucc, this)
		})
	},
	handleLogoutSucc: function(res) {
		if( res && res.data && res.data.logout ){
			window.location.reload()
		}
	}
})