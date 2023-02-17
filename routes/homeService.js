const express = require("express");
const {
  home,
  inmuebleById,
  nuevoInmueble,
  filtrarInmuebles,
} = require("../controllers/homeService");
const router = express.Router();
const { register, login } = require("../controllers/homeService");
const { verifyToken } = require("../validators/jwt");

router.post("/formulario/register", register);
router.post("/formulario", login, verifyToken);

router.get("/inmuebles", home);
router.get("/inmuebles/:id", inmuebleById);
router.post("/inmuebles/nuevoInmueble", nuevoInmueble);
router.get("/inmuebles/filtro/inmueblesFiltrados", filtrarInmuebles);

module.exports = router;
