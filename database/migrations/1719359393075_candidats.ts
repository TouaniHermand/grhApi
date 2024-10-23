import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'candidats'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nom', 80).notNullable()
      table.string('prenom', 80).notNullable()
      table.string('date_naissance').notNullable()
      table.string('email', 254).notNullable().unique()
      table.text('experience_1').notNullable()
      table.text('experience_2').nullable()
      table.text('experience_3').nullable()
      table.enu('diplomes', ['Baccalaureat', 'BTS', 'Licence', 'Master']).notNullable()
      table.enu('domaine', ['communication', 'comptabilite', 'informatique', 'ressources_humaines']).notNullable()
      table.text('lettre_motivation').notNullable()
      table.integer('annees_experience').notNullable()
      table.string('thumbnail').notNullable()
      table.enu('status' , ['Expectation','Reject','Validate']).defaultTo('Expectation').notNullable() 

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
