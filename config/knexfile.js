const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "inmobiliaria",
  },
});

module.exports = knex;
