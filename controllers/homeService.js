const knex = require("../config/knexfile");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../validators/jwt");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcryptjs.genSalt(10);
  const acces = await bcryptjs.hash(password, salt);
  knex("usuarios")
    .insert({
      name: name,
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
