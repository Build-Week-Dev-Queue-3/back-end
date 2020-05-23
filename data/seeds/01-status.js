
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('statuses').insert([
        {id: 1, status: "submitted"},
        {id: 2, status: "in progress"},
        {id: 3, status: "returned to queue"},
        {id: 4, status: "complete"}
      ]);
    });
};
