const knex = require("../config/knexfile");

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
    .then((resultado) => {
      res.json({ messagee: "Se ha registrado el nuevo inmueble exitosamente" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// MOSTRAR INMUEBLES FILTRADOS
exports.filtrarInmuebles = async (req, res) => {
  const { operacion, inmueble, dormitorios, departamento } = req.body;
  knex("inmuebles")
    .where("operacion", operacion)
    .where("inmueble", inmueble)
    .where("dormitorios", dormitorios)
    .where("departamento", departamento)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
