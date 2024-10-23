import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Presence extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public heure_arrivee: string

  @column()
  public heure_depart: string

  @column()
  public mois: string

  @column()
  public jours_present: number

  @column()
  public employe_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  public static  storeTasks =  async(data: storePresence)=>{
    await this.create({
      heure_arrivee: data.heure_arrivee,
      heure_depart: data.heure_depart,
      mois: data.mois,
      jours_present: data.jours_present,
      employe_id: data.employeId
    })

    return Promise.resolve('Presence enregistrer avec succes')
  }
}
