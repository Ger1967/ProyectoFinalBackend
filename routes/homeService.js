const express = require("express");
const { home } = require("../controllers/homeService");
const router = express.Router();

router.get("/", home);

module.exports = router;
