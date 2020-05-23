const cleaner = require("knex-cleaner");
const colors = require('colors');

exports.seed = function (knex) {
  return cleaner
    .clean(knex, {
      mode: "delete",
      restartIdentity: true, // ask PosrgreSQL to reset the Primary Keys back to 0
      ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    })
    .then(() => console.log("\n== All tables truncated, ready to seed ==\n".cyan.bold.underline));
};
