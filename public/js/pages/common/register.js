function Register(container,modalContainer) { 
	this.container = container;
	this.modalContainer = modalContainer
	this.init();
}

Register.BtnTemp = `<li><a href="#" data-toggle="modal" data-target="#RegModal">注册</a></li>`
Register.ModalTemp = `
<div class="modal fade" id="RegModal" tabindex="-1" role="dialog" aria-labelledby="regModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="regModalLabel">注册</h4>
      </div>
      <div class="modal-body">
		<div class="form-group">
		<label for="reg-username">用户名：</label>
		<input type="text" class="form-control reg-username" id="reg-username" placeholder="请输入用户名">
		</div>
		<div class="form-group">
		<label for="reg-password">密码：</label>
		<input type="password" class="form-control reg-password" id="reg-password" placeholder="请输入密码">
		</div>
      </div>
	  <div style = "padding : 0 18px">   
	      <div class="alert alert-success hide js-suss-notice" role="alert">恭喜您，注册成功</div>
	      <div class="alert alert-warning hide js-err-notice" role="alert">对不起，用户名已存在</div>
	  </div> 
      <div class="modal-footer">
        <button type="button" class="btn btn-primary js-submit">提交</button>
      </div>
    </div>
  </div>
</div>
`


$.extend(Register.prototype, {
	init: function() {
		this.createBtn();
		this.createModal();
		this.bindEvents()
	},
	createBtn: function() {
		this.btn = $(Register.BtnTemp);
		this.container.append(this.btn)
	},
	createModal: function() {
		this.modal = $(Register.ModalTemp);
		this.succNoticeElem = this.modal.find(".js-suss-notice");
		this.errNoticeElem = this.modal.find(".js-err-notice")
		this.modalContainer.append(this.modal);
	},
	bindEvents: function() {
		this.submitBtn = this.modal.find(".js-submit");
		this.submitBtn.on("click",$.proxy(this.handleSubmitBtnClick, this));
	},
	handleSubmitBtnClick: function(){
		var username = this.modal.find(".reg-username").val();
		var password = this.modal.find(".reg-password").val();
		$.ajax({
			type: "POST",
			url: "/api/register",
			data: {
				username: username,
				password: password
			},
			success: $.proxy(this.handleSubmitSucc, this)
		})
	},
	handleSubmitSucc: function(res) {
		if( res && res.data && res.data.register ){
			this.succNoticeElem.removeClass("hide");
			this.errNoticeElem.addClass("hide");
			setTimeout($.proxy(this.handleDelay, this),3000)
		}else{
			this.errNoticeElem.removeClass("hide");
			this.succNoticeElem.addClass("hide");
		}
	},
	handleDelay: function() {
		window.location.reload()
		this.succNoticeElem.addClass("hide");
	}
})