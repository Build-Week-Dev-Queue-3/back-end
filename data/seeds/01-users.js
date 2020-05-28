
exports.seed = function(knex) {
      return knex('users').insert([
          {id: 1, name: "Test", email: "email@email.com", password: "password", cohort: "web29", student: true},
          {id: 2, name: "Test", email: "memail@email.com", password: "password", cohort: "web29", student: true, helper: true}
      ]);
};
