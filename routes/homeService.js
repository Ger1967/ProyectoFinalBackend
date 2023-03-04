const express = require("express");
const {
  home,
  inmuebleById,
  nuevoInmueble,
  filtrarInmuebles,
} = require("../controllers/homeService");
const router = express.Router();
const { register, login } = require("../controllers/homeService");
const { verifyData } = require("../middleware/dataVerify");
const { verifyToken } = require("../validators/jwt");

router.post("/formulario/register", register);
router.post("/formulario", login, verifyToken);

router.get("/inmuebles", home);
router.get("/inmuebles/:id", inmuebleById);
router.post("/inmuebles/nuevoInmueble", verifyData, nuevoInmueble);
router.post("/inmuebles/filtro/inmueblesFiltrados", filtrarInmuebles);

module.exports = router;
