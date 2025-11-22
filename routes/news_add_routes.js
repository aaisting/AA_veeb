const express = require("express");
const router = express.Router();

const {
    news_home_page,
    news_all

} = require("../controllers/news_add_Controllers");

router.route("/news_home_page").get(news_home_page);
router.route("/news_all").get(news_all);

module.exports = router;