function UpdatePosition(container) {
	this.container = container;
	this.init()
}

UpdatePosition.ModalTemp = `
<div class="modal fade" id="updPosModal" tabindex="-1" role="dialog" aria-labelledby="updPosModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="updPosModalLabel">修改职位</h4>
      </div>
      <div class="modal-body">
		<div class="form-group">
			<label for="updPos-company">公司名称：</label>
			<input type="text" class="form-control updPos-company" id="updPos-company" placeholder="请输入公司名称">
		</div>
		<div class="form-group">
			<label for="updPos-position">职位名称：</label>
			<input type="text" class="form-control updPos-position" id="updPos-position" placeholder="请输入职位名称">
		</div>
		<div class="form-group">
			<label for="updPos-salary">薪资范围：</label>
			<select class="form-control updPos-salary" id="updPos-salary" >
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
			<label for="updPos-address">办公地点：</label>
			<input type="text" class="form-control updPos-address" id="updPos-address" placeholder="请输入办公地点">
		</div>
		<div class="form-group">
			<label for="updPos-logo">logo:</label>
			<input type="file" class="form-control updPos-logo" id="exampleInputFile">
		</div>
      </div>
	  <div style = "padding : 0 18px">   
	      <div class="alert alert-success hide js-suss-notice" role="alert">恭喜您，修改成功</div>
	  </div> 
      <div class="modal-footer">
        <button type="button" class="btn btn-primary js-submit">提交</button>
      </div>
    </div>
  </div>
</div>
`

$.extend(UpdatePosition.prototype, {
	init: function() {
		this.createModal();
		this.bindEvents();
	},
	createModal: function() {
		this.modal = $(UpdatePosition.ModalTemp);
		this.company = this.modal.find(".updPos-company") 
		this.position = this.modal.find(".updPos-position") 
		this.salary = this.modal.find(".updPos-salary") 
		this.address = this.modal.find(".updPos-address") 
		this.succNoticeElem = this.modal.find(".js-suss-notice")
		this.container.append(this.modal)
	},
	showItem: function(id) {
		this.modal.modal("show");
		this.getPositionInfo(id)
	},
	getPositionInfo: function(id) {
		$.ajax({
			url: "/api/getPositionInfo",
			data: {
				id: id
			},
			success: $.proxy(this.handleGetPositionSucc, this)
		})
	},
	handleGetPositionSucc: function(res) {
		if(res && res.data && res.data.info) {
			var info = res.data.info;
			this.company.val(info.company);
			this.position.val(info.position);
			this.salary.val(info.salary);
			this.address.val(info.address);
			this.id = info._id
		}
	},
	bindEvents: function() {
		this.submitBtn = this.modal.find(".js-submit");
		this.submitBtn.on("click", $.proxy(this.handleSubmitClick, this))
	},
	handleSubmitClick: function() {
		var company = this.modal.find(".updPos-company").val();
		var position = this.modal.find(".updPos-position").val();
		var salary = this.modal.find(".updPos-salary").val();
		var address = this.modal.find(".updPos-address").val();
		var logo = this.modal.find(".updPos-logo")[0].files[0]

		var formData = new FormData();
		formData.append("company", company);
		formData.append("position", position);
		formData.append("salary", salary);
		formData.append("address", address);
		formData.append("logo", logo)
		formData.append("id", this.id)

		$.ajax({
			cache: false,
			type: "POST",
			url: "/api/updatePosition",
			processData: false,
			contentType: false,
			data: formData,
			success: $.proxy(this.handleSubmitSucc, this)
		})
	},
	handleSubmitSucc: function(res){
		if( res && res.data && res.data.update ) {
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