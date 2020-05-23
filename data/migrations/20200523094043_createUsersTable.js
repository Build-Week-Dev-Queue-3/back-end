
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users
        .increments()
    users
        .string('name')
        .notNullable();
    users  
        .string('email')
        .notNullable()
        .unique()
    users
        .string('password')
        .notNullable()
    users
        .string('cohort')
        .notNullable()
    users
        .boolean('student')
        .defaultTo(true)
    users
        .boolean('helper')
        .defaultTo(false)
    users
        .timestamps(true, true)

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
