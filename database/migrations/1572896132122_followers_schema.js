'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowersSchema extends Schema {
  up() {
    this.create('followers', (table) => {
      table.increments()
      // table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('follow_id').unsigned().notNullable().references('id').inTable('users')

      table.timestamps()
    })
  }

  down() {
    this.drop('followers')
  }
}

module.exports = FollowersSchema
