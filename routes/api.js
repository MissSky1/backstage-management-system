const express = require('express');
const router = express.Router();
//专门解析文件的中间件         
const userController = require("../controller/user.js")
const positionController = require("../controller/position.js")
const personController = require("../controller/person.js")
const upload = require("../utils/uploads.js");

/* GET home page. */
router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/isLogin", userController.isLogin)
router.get("/logout", userController.logout)

router.post("/addPosition", upload.single('logo'), positionController.addPosition)
router.get("/getPositionList", positionController.getPositionList)
router.get("/removePosition", positionController.removePosition)
router.get("/getPositionInfo", positionController.getPositionInfo)
router.post("/updatePosition", upload.single('logo'), positionController.updatePosition)
router.get("/getFilterCompany", positionController.getFilterCompany)

router.post("/addPerson", upload.single('photo'), personController.addPerson)
router.get("/getPersonList", personController.getPersonList)
router.get("/deletePerson", personController.deletePerson)
router.get("/getPersonInfo", personController.getPersonInfo)
router.post("/UpdatePerson", upload.single('photo'), personController.UpdatePerson)

module.exports = router;
