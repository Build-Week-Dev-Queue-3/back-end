
exports.up = function(knex) {
  return knex.schema.createTable('slack', slack => {
      slack.increments()
      slack.text('text')
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('slack')
};
