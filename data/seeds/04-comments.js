
exports.seed = function(knex) {
      return knex('comments').insert([
        {id: 1, ticket_id: 1, commenter_id: 2, comment: "this is test comment 1 text"},
        {id: 2, ticket_id: 1, commenter_id: 1, comment: "this is test comment 2 text"},
        {id: 3, ticket_id: 2, commenter_id: 1, comment: "this is test comment 3 text"},
      ]);
};
