const knex = require("../config/knexfile");

// TOKEN
const verifyData = (req, res, next) => {
  const direccion = req.body.direccion;
  console.log(direccion);
  knex("inmuebles")
    .select("direccion")
    .where({
      direccion: direccion,
    })

    .then((rows) => {
      console.log(rows);
      if (rows.length > 0) {
        res.status(400).json({ error: "La direccion ya existe en el sistema" });
        // alert("Ya existe la direccion en el sistema");
      } else {
        // articulo registrado
        next();
      }
    })
    .catch((error) => {
      console.error("error al buscar direccion:", error);
      res.status(500).json({ error: "error al buscar direccion" });
    });
};

module.exports = { verifyData };
