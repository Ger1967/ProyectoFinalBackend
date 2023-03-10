const knex = require("../config/knexfile");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../validators/jwt");

// REGISTRAR NUEVO USUARIO
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  const salt = await bcryptjs.genSalt(10);
  const acces = await bcryptjs.hash(password, salt);
  knex("usuarios")
    .insert({
      nombre: nombre,
      email: email,
      password: acces,
    })
    .then(() => {
      res.json({ message: "Se ha registrado correctamente" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// MOSTRAR TODOS LOS INMUEBLES EN HOME
exports.home = (req, res) => {
  knex("inmuebles")
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// MOSTRAR LOS DETALLES DE UN INMUEBLE BY ID
exports.inmuebleById = (req, res) => {
  const id = req.params.id;
  knex("inmuebles")
    .where("id_inmuebles", id)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// REGISTRAR NUEVO INMUEBLE
exports.nuevoInmueble = async (req, res) => {
  const {
    operacion,
    inmueble,
    barrio,
    direccion,
    dormitorios,
    baños,
    metraje_terreno,
    metraje_edificado,
    descripcion,
    mapa,
    precio,
    foto,
    departamento,
  } = req.body;
  knex("inmuebles")
    .insert({
      operacion: operacion,
      inmueble: inmueble,
      barrio: barrio,
      direccion: direccion,
      dormitorios: dormitorios,
      baños: baños,
      metraje_terreno: metraje_terreno,
      metraje_edificado: metraje_edificado,
      descripcion: descripcion,
      mapa: mapa,
      precio: precio,
      foto: foto,
      departamento: departamento,
    })
    .then(() => {
      res.json({ message: "Se ha registrado el nuevo inmueble exitosamente" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// LOGIN DE USUARIOS
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  knex("usuarios")
    .where({ email: email })
    .then(async (usuario) => {
      console.log(usuario);
      console.log(email, password);
      const validPassword = await bcryptjs.compare(
        password,
        usuario[0].password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "Email o contraseña incorrecto" });
      }
      const token = jwt.sign(
        {
          name: usuario[0].name,
        },
        TOKEN_SECRET
      );
      res.json({ error: null, data: "Se ha logeado correctamente", token });
      next();
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "Email o contraseña incorrecto" + err.message });
    });
};

// MOSTRAR INMUEBLES FILTRADOS
exports.filtrarInmuebles = async (req, res) => {
  const { operacion, inmueble, dormitorio, departamento } = req.body;
  let consulta = {};
  if (operacion !== "Tipo de Operacion") {
    consulta.operacion = operacion;
  }
  if (inmueble !== "Tipo de Propiedad") {
    consulta.inmueble = inmueble;
  }
  if (dormitorio !== "Dormitorios") {
    consulta.dormitorios = dormitorio;
  }
  if (departamento !== "Departamento") {
    consulta.departamento = departamento;
  }
  console.log(consulta);
  knex("inmuebles")
    .where(consulta)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// UPLODEAR FOTO

exports.foto = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      error: "Porfavor selecciona una imagen",
    });
  }

  knex("foto")
    .insert({ filename: file.filename })
    .then(() => {
      res.json({
        imageUrl: `http://localhost:3002/uploads/${file.filename}`,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Error al ingresar la imagen en la base de datos",
      });
    });
};
