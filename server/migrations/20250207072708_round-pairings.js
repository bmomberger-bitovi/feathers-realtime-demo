export async function up(knex) {
  await knex.schema.createTable('round_pairings', (table) => {
    table.increments('id').primary();
    table.smallint('round');
    table.integer('team1_id');
    table.integer('team2_id');
    table.foreign('team1_id')
      .references('teams.id')
      .deferrable('deferred');
    table.foreign('team2_id')
      .references('teams.id')
      .deferrable('deferred');
  })
}

export async function down(knex) {
  await knex.schema.dropTable('round_pairings')
}
