exports.up = function(knex) {
  return knex.schema.createTable('courses', table => {
    table.increments('id').primary()
    table
      .string('name', 120)
      .notNullable()
      .unique()
    table
      .string('program', 120)
      .notNullable()
      .unique()
    table
      .enum('type', ['graduação', 'especialização', 'mestrado', 'doutorado'])
      .notNullable()
      .defaultTo('graduação')
    table.integer('unityId').unsigned()
    table.foreign('unityId').references('academicUnities.id')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('courses')
}
