const multer  = require('multer');

//想要为你传入后台的文件加后缀
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
  	//加时间戳是为了避免图片重名
    cb(null, Date.now() + file.originalname)
  }
}) 
var upload = multer({ storage: storage })

module.exports = upload