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
