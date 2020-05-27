
exports.up = function(knex) {
  return knex.schema.createTable('slack', slack => {
      slack.increments()
      slack.text('text')
      slack.text('user_name')
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('slack')
};
