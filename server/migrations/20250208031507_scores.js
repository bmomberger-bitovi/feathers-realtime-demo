export async function up(knex) {
  await knex.schema.createTable('scores', (table) => {
    table.increments('id').primary();
    table.integer('round_pairing_id');
    table.foreign('round_pairing_id')
      .references('round_pairings.id')
      .deferrable('deferred');
    table.integer('score1');
    table.integer('score2');
  })
}

export async function down(knex) {
  await knex.schema.dropTable('scores')
}
