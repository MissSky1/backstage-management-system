function AddPerson(container) {
	this.container = container;
	this.init()
}

AddPerson.BtnTemp = `
<button type="button" class="btn btn-info" data-toggle="modal" data-target="#addPerModal">添加</button>
`
AddPerson.ModalTemp = `
<div class="modal fade" id="addPerModal" tabindex="-1" role="dialog" aria-labelledby="addPerModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="addPerModalLabel">添加求职者</h4>
      </div>
      <div class="modal-body">
		<div class="form-group">
			<label for="addPer-username">姓名：</label>
			<input type="text" class="form-control addPer-username" id="addPer-username" placeholder="请输入姓名">
		</div>
		<div class="form-group">
			<label for="addPer-sex">性别：</label>
			<select class="form-control addPer-sex" id="addPer-sex" >
			  <option selected>男</option>
			  <option>女</option>
			</select>
		</div>
		<div class="form-group">
			<label for="addPer-age">年龄：</label>
			<input type="text" class="form-control addPer-age" id="addPer-age" placeholder="请输入年龄">
		</div>
		<div class="form-group">
			<label for="addPer-address">地址：</label>
			<input type="text" class="form-control addPer-address" id="addPer-address" placeholder="请输入地址">
		</div>		
		<div class="form-group">
			<label for="addPer-education">学历：</label>
			<select class="form-control addPer-education" id="addPer-education" >
			  <option selected>请输入学历</option>
			  <option>高中及以下</option>
			  <option>专科</option>
			  <option>本科</option>
			  <option>硕士</option>
			  <option>博士</option>
			</select>
		</div>
		<div class="form-group">
			<label for="addPer-workExp">工作经验：</label>
			<select class="form-control addPer-workExp" id="addPer-workExp" >
			  <option selected>请输入工作经验</option>
			  <option>一年以下</option>
			  <option>两年</option>
			  <option>三年</option>
			  <option>四年</option>
			  <option>五年以上</option>
			</select>
		</div>
		<div class="form-group">
			<label for="addPer-salary">期望薪资：</label>
			<select class="form-control addPer-salary" id="addPer-salary" >
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
			<label for="addPer-photo">头像：</label>
			<input type="file" class="form-control addPer-photo" id="addPer-photo">
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

$.extend(AddPerson.prototype, {
	init: function() {
		this.createBtn();
		this.createModal();
		this.bindEvents();
	},
	createBtn: function() {
		this.btn = $(AddPerson.BtnTemp);
		this.container.append(this.btn)
	},
	createModal: function() {
		this.modal = $(AddPerson.ModalTemp);
		this.succNoticeElem = this.modal.find(".js-suss-notice")
		this.container.append(this.modal)
	},
	bindEvents: function() {
		this.submitBtn = this.modal.find(".js-submit");
		this.submitBtn.on("click", $.proxy(this.handleSubmitClick, this))
	},
	handleSubmitClick: function() {
		var username = this.modal.find(".addPer-username").val();
		var age = this.modal.find(".addPer-age").val();
		var sex = this.modal.find(".addPer-sex").val();
		var address = this.modal.find(".addPer-address").val();
		var education = this.modal.find(".addPer-education").val();
		var workExp = this.modal.find(".addPer-workExp").val();
		var salary = this.modal.find(".addPer-salary").val();
		var photo = this.modal.find(".addPer-photo")[0].files[0]

		var formData = new FormData()
		formData.append("username", username);
		formData.append("age", age);
		formData.append("sex", sex);
		formData.append("address", address);
		formData.append("education", education);
		formData.append("workExp", workExp);
		formData.append("salary", salary);
		formData.append("photo", photo);

		$.ajax({
			cache: false,
			type: "POST",
			url: "/api/addPerson",
			data: formData,
			processData: false,
			contentType: false,
			success: $.proxy(this.handleSubmitSucc, this)
		})
	},
	handleSubmitSucc: function(res){
		if( res && res.data && res.data.inserted ) {
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