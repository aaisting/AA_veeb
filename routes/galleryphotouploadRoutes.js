const express = require ("express");
const multer = require("multer");
const checkLogin = require("../src/checkLogin");

const router = express.Router();
//kõik marsruuudis kasutavad vahevara:
router.use(checkLogin.isLogin);
//seadistame vahevara fotode üleslaadimiseks kindlasse kataloogi
const uploader = multer({dest: "./public/gallery/orig/"});

const {
	galleryphotouploadPage,
	galleryphotouploadPagePost
} = require("../controllers/galleryphotouploadControllers");

router.route("/").get(galleryphotouploadPage);
router.route("/").post(uploader.single("photoInput"), galleryphotouploadPagePost);

module.exports = router;
