function Header(container, index) {
	this.container = container;
  this.selectedIndex = index;
	this.init();
}

Header.Temp = `
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">拉勾网后台</a>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav js-left">
        <li><a href="/">首页</a></li>
        <li><a href="/list.html">职位管理</a></li>
        <li><a href="/person.html">求职者管理</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right js-right">
      </ul>
    </div>
  </div>
</nav>
`

$.extend(Header.prototype, {
	init: function(){
		this.createDom();
    this.selected();
    this.getLoginInfo()    
	},
	createDom: function() {
		this.modal = $(Header.Temp);
    this.rightArea = this.modal.find(".js-right")
		this.container.append(this.modal)
	},
  selected: function() {
    this.leftArea = this.modal.find(".js-left");
    this.listItems = this.leftArea.find("li");
    this.listItems.eq(this.selectedIndex).addClass("active")
  },
  getLoginInfo: function() {
    $.ajax({
      type: "GET",
      url: "/api/isLogin",
      success: $.proxy(this.handleIsLoginSucc, this)
    })
  },
  handleIsLoginSucc: function(res) {
    if( res && res.data && res.data.isLogin ){
      this.createLogout()
    }else{
      this.createRegister();
      this.createLogin()
    }
  },
  createRegister: function() {
    this.register = new Register(this.rightArea, this.modal)
  },
  createLogin: function() {
    this.login = new Login(this.rightArea, this.modal)
  },
  createLogout: function() {
    this.logout = new Logout(this.rightArea)
  }
})