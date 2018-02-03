function AddPosition(container) {
	this.container = container;
	this.init()
}

AddPosition.BtnTemp = `
<button type="button" class="btn btn-info" data-toggle="modal" data-target="#addPosModal">添加</button>
`
AddPosition.ModalTemp = `
<div class="modal fade" id="addPosModal" tabindex="-1" role="dialog" aria-labelledby="addPosModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="addPosModalLabel">添加职位</h4>
      </div>
      <div class="modal-body">
		<div class="form-group">
			<label for="addPos-company">公司名称：</label>
			<input type="text" class="form-control addPos-company" id="addPos-company" placeholder="请输入公司名称">
		</div>
		<div class="form-group">
			<label for="addPos-position">职位名称：</label>
			<input type="text" class="form-control addPos-position" id="addPos-position" placeholder="请输入职位名称">
		</div>
		<div class="form-group">
			<label for="addPos-salary">薪资范围：</label>
			<select class="form-control addPos-salary" id="addPos-salary" >
			  <option selected>请输入薪资范围</option>
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
			<label for="addPos-address">办公地点：</label>
			<input type="text" class="form-control addPos-address" id="addPos-address">
		</div>
		<div class="form-group">
			<label for="addPos-logo">logo:</label>
			<input type="file" class="form-control addPos-logo" id="exampleInputFile">
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

$.extend(AddPosition.prototype, {
	init: function() {
		this.createBtn();
		this.createModal();
		this.bindEvents();
	},
	createBtn: function() {
		this.btn = $(AddPosition.BtnTemp);
		this.container.append(this.btn)
	},
	createModal: function() {
		this.modal = $(AddPosition.ModalTemp);
		this.succNoticeElem = this.modal.find(".js-suss-notice")
		this.container.append(this.modal)
	},
	bindEvents: function() {
		this.submitBtn = this.modal.find(".js-submit");
		this.submitBtn.on("click", $.proxy(this.handleSubmitClick, this))
	},
	handleSubmitClick: function() {
		var company = this.modal.find(".addPos-company").val();
		var position = this.modal.find(".addPos-position").val();
		var salary = this.modal.find(".addPos-salary").val();
		var address = this.modal.find(".addPos-address").val();
		var logo = this.modal.find(".addPos-logo")[0].files[0];

		//创建一个表单数据的对象
		var formData = new FormData()

		formData.append("company", company);
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("logo", logo);

		$.ajax({
			//表示ajax带不带缓存
			cache: false,
			type: "POST",
			url: "/api/addPosition",
			//将ajax自动解析成字符串的属性关掉
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleSubmitSucc, this)
		})
	},
	handleSubmitSucc: function(res){
		if( res && res.data && res.data.inserted ) {
			this.succNoticeElem.removeClass("hide")
			setTimeout($.proxy(this.handleDealy, this),1000)
			$(this).trigger("change")
		}
	},
	handleDealy: function(){
		this.succNoticeElem.addClass("hide")
		this.modal.modal("hide")
	}
})