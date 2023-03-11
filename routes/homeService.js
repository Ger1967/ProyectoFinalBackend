const express = require("express");
const multer = require("multer");
// const upload = multer({ dest: "/public/uploads/" });
const knex = require("../config/knexfile");
const fs = require("fs");
const app = express();
const path = require("path");

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

////////////////// UPLOAD DE FOTO ////////////////////////////////////

app.use("/static", express.static("uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/foto", upload.single("imagen"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Debe seleccionar una imagen");
    }
    let fileType = req.file.mimetype.split("/")[1];
    console.log("fileType", fileType);
    let newFileName = req.file.filename;
    console.log("newFileName", newFileName);

    fs.rename(
      `./uploads/${req.file.filename}`,
      `./uploads/${newFileName}`,
      async function () {
        console.log("callback");

        const result = await knex("inmuebles").insert({
          foto: `/uploads/${newFileName}`,
        });
        console.log(result);

        res.send(200);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al insertar la imagen en la base de datos");
  }
});

module.exports = router;
// router.post("/foto", upload.single("imagen"), async (req, res) => {
//   let fileType = req.file.mimetype.split("/")[1];
//   console.log("fileType", fileType);
//   let newFileName = req.file.filename + "." + fileType;
//   console.log("newFileName", newFileName);

//   fs.rename(
//     `../public/uploads/${req.file.filename}`,
//     `../public/uploads/${newFileName}`,
//     async function () {
//       console.log("callback");

//       try {
//         const result = await knex("inmuebles").insert({
//           foto: `/public/${newFileName}`,
//         });
//         console.log(result);

//         // fs.readFile(`./uploads/${newFileName}`, (err, data) => {
//         //   if (err) {
//         //     console.error(err);
//         //     res.status(500).send("Error al leer el archivo");
//         //   } else {
//         //     res.send(data);
//         //   }
//         // });
//         res.send(200, "Imagen ingresada correctamente");
//       } catch (error) {
//         console.error(error);
//         res.status(500).send("Error al insertar la imagen en la base de datos");
//       }
//     }
//   );
// });

// module.exports = router;
