
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('statuses').insert([
        {status: "submitted"},
        {status: "in progress"},
        {status: "returned to queue"},
        {status: "complete"}
      ]);
    });
};
