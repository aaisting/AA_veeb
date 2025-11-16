const express = require ("express");

const router = express.Router();

const {photogalleryhome} = require("../controllers/photogallerycontrollers");

router.route("/").get(photogalleryhome);

module.exports = router;