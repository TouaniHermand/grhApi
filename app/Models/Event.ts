import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public heure: string

  @column()
  public date_naissance: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static storeUser = async (data: CreateEventType) => {
    await this.create({
      heure: data.heure,
      date_naissance: data.date_naissance,
    })

    return Promise.resolve("Event Created")
  }
}
