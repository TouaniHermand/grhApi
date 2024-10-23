import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      
      table.string('nom').notNullable()
      table.string('prenom').notNullable()
      table.string('email',255).notNullable().unique()
      table.string('contact').notNullable()
      table.string('password',255).notNullable()
      table.enu('role' , ['admin','user']).defaultTo('user').notNullable() 

      table.integer('departement_id').unsigned().references('departements.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
