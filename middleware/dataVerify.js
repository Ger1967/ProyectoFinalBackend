const knex = require("../config/knexfile");

const verifyData = (req, res, next) => {
  const direccion = req.body.direccion;
  knex("inmuebles").where("direccion");
  if (direccion == inmuebles[0].direccion) {
    res
      .status(401)
      .json({ message: "Su articulo ya se encuentra en nuestro registro" });
    return;
  }
  next();
};

module.exports = { verifyData };
