const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/homeService");
const { verifyToken } = require("../validators/jwt");

router.post("/formulario/register", register);
router.post("/formulario", login, verifyToken);

module.exports = router;
