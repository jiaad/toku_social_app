'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up() {
    this.create('comments', (table) => {
      table.increments()
      table.text('content').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('post_id').unsigned().references('id').inTable('posts')
      table.timestamps()
    })
  }

  down() {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
