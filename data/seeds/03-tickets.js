
exports.seed = function(knex) {
      return knex('tickets').insert([
        {id: 1, user_id:1, subject: "This is test ticket 1", ticket_text: "This is text ticket 1 text", status_id: 2},
        {id: 2, user_id:2, subject: "This is test ticket 2", ticket_text: "This is text ticket 2 text", status_id: 1}
      ]);
};
