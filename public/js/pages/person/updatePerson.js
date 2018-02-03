function UpdatePerson(container) {
	this.container = container;
	this.init()
}

UpdatePerson.ModalTemp = `
<div class="modal fade" id="updpersonModal" tabindex="-1" role="dialog" aria-labelledby="updpersonModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="updpersonModalLabel">添加求职者</h4>
      </div>
      <div class="modal-body">
		<div class="form-group">
			<label for="updperson-username">姓名：</label>
			<input type="text" class="form-control updperson-username" id="updperson-username" placeholder="请输入姓名">
		</div>
		<div class="form-group">
			<label for="updperson-sex">性别：</label>
			<select class="form-control updperson-sex" id="updperson-sex" >
			  <option selected>男</option>
			  <option>女</option>
			</select>
		</div>
		<div class="form-group">
			<label for="updperson-age">年龄：</label>
			<input type="text" class="form-control updperson-age" id="updperson-age" placeholder="请输入年龄">
		</div>
		<div class="form-group">
			<label for="updperson-address">地址：</label>
			<input type="text" class="form-control updperson-address" id="updperson-address" placeholder="请输入地址">
		</div>		
		<div class="form-group">
			<label for="updperson-education">学历：</label>
			<select class="form-control updperson-education" id="updperson-education" >
			  <option selected>请输入学历</option>
			  <option>高中及以下</option>
			  <option>专科</option>
			  <option>本科</option>
			  <option>硕士</option>
			  <option>博士</option>
			</select>
		</div>
		<div class="form-group">
			<label for="updperson-workExp">工作经验：</label>
			<select class="form-control updperson-workExp" id="updperson-workExp" >
			  <option selected>请输入工作经验</option>
			  <option>一年以下</option>
			  <option>两年</option>
			  <option>三年</option>
			  <option>四年</option>
			  <option>五年以上</option>
			</select>
		</div>
		<div class="form-group">
			<label for="updperson-salary">期望薪资：</label>
			<select class="form-control updperson-salary" id="updperson-salary" >
			  <option selected>请输入期望薪资</option>
			  <option>5k-10k</option>
			  <option>10k-15k</option>
			  <option>15k-20k</option>
			  <option>20k-25k</option>
			  <option>25k-30k</option>
			  <option>30k-35k</option>
			  <option>35k以上</option>
			</select>
		</div>
		<div class="form-group">
			<label for="updperson-photo">头像：</label>
			<input type="file" class="form-control updperson-photo" id="updperson-photo">
	  	</div>
      </div>
	  <div style = "padding : 0 18px">   
	      <div class="alert alert-success hide js-suss-notice" role="alert">恭喜您，添加成功</div>
	  </div> 
      <div class="modal-footer">
        <button type="button" class="btn btn-primary js-submit">提交</button>
      </div>
    </div>
  </div>
</div>
`

$.extend(UpdatePerson.prototype, {
	init: function() {
		this.createModal();
		this.bindEvents();
	},
	createModal: function() {
		this.modal = $(UpdatePerson.ModalTemp);
		this.username = this.modal.find(".updperson-username");
		this.sex = this.modal.find(".updperson-sex")
		this.age = this.modal.find(".updperson-age")
		this.address = this.modal.find(".updperson-address")
		this.education = this.modal.find(".updperson-education")
		this.workExp = this.modal.find(".updperson-workExp")
		this.salary = this.modal.find(".updperson-salary")
		this.succNoticeElem = this.modal.find(".js-suss-notice")
		this.photo = this.modal.find(".updperson-photo")
		this.container.append(this.modal)
	},
	showItem: function(id) {
		this.modal.modal("show");
		this.getPersonInfo(id);
	},
	getPersonInfo: function(id) {
		$.ajax({
			url: "/api/getPersonInfo",
			data: {
				id: id
			},
			success: $.proxy(this.handleGetPersonSucc, this)
		})
	},
	handleGetPersonSucc: function(res) {
		if(res && res.data && res.data.info) {
			var info = res.data.info;
			this.username.val(info.username);
			this.sex.val(info.sex);
			this.age.val(info.age);
			this.address.val(info.address);
			this.education.val(info.education);
			this.workExp.val(info.workExp);
			this.salary.val(info.salary);
			this.id = info._id;
		}
	},
	bindEvents: function() {
		this.submitBtn = this.modal.find(".js-submit");
		this.submitBtn.on("click", $.proxy(this.handleSubmitClick, this))
	},
	handleSubmitClick: function() {
		var formData = new FormData();
		formData.append("username", this.username.val() );
		formData.append("age", this.age.val() )
		formData.append("sex", this.sex.val() )
		formData.append("address", this.address.val() )
		formData.append("education", this.education.val() )
		formData.append("workExp", this.workExp.val() )
		formData.append("salary", this.salary.val() );
		formData.append("id", this.id )
		formData.append("photo", this.photo[0].files[0] )
		$.ajax({
			cache: false,
			type: "POST",
			url: "/api/UpdatePerson",
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleSubmitSucc, this)
		})
	},
	handleSubmitSucc: function(res){
		if( res && res.data && res.data.update ) {
			this.succNoticeElem.removeClass("hide")
			setTimeout($.proxy(this.handleDealy, this),1000);
			$(this).trigger("change")
		}
	},
	handleDealy: function(){
		this.succNoticeElem.addClass("hide")
		this.modal.modal("hide")
	}
})