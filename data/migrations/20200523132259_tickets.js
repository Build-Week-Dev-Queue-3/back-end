
exports.up = function(knex) {
    return knex.schema
    .createTable('statuses', status => {
        status.increments();
        status
            .string('status')
            .notNullable()
            .unique();
    })
    .createTable('tickets', tickets => {
        tickets.increments()
        tickets
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
        tickets
            .string('subject')
            .notNullable()
        tickets
            .string('ticket_text')
            .notNullable()
        tickets
            .integer('status_id')
            .unsigned()
            .defaultTo(1)
            .references('id')
            .inTable('statuses')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')
    })
    .createTable('comments', comments => {
        comments.increments()
        comments
            .integer('ticket_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tickets')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        comments
            .integer('commenter_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        comments
            .string('comment')
            .notNullable()
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments').dropTableIfExists('tickets').dropTableIfExists('statuses')
  
};
