const knex = require("../config/knexfile");

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
        res
          .status(400)
          .json({ error: "Su articulo ya se encuentra en nuestro registro" });
      } else {
        // articulo registrado
        next();
      }
    })
    .catch((error) => {
      console.error("error al buscar direccion:", error);
      res.status(500).json({ error: "error al buscar direccion" });
    });

  // const direccion = req.body;
  // const id = req.params.id;
  // knex("inmuebles").where("direccion");
  // if (direccion == id[0].direccion) {
  //   res
  //     .status(401)
  //     .json({ message: "Su articulo ya se encuentra en nuestro registro" });
  //   return;
  // }
};

module.exports = { verifyData };
