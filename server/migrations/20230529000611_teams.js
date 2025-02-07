export async function up(knex) {
  await knex.schema.createTable('teams', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('player1');
    table.string('player2');
  })
}

export async function down(knex) {
  await knex.schema.dropTable('teams')
}
