import { DateTime } from 'luxon'
import { BaseModel, column , hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import Employe from './Employe'

export default class Departement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Employe, {
    localKey: 'id',
    foreignKey: 'departement_id'
  })
  public employes : HasMany<typeof Employe>
  
  public static  storeTasks =  async(data: StoreDepartementType)=>{
    const exists = await this.findBy('nom',data.nom)
    if(exists) {
      return Promise.reject(new Error("Departement with this name already exists"))
    }
    await this.create({
      nom: data.nom
    })

    return Promise.resolve('Departement created')
  }

  public static updateDepartement = async (data: UpdateDepartementType)=>{
    const  exists = await this.find(data.id)
    if( !exists) {
      return Promise.reject(new Error('Task not found'))
    }

    if(data.nom) {
      exists.nom = data.nom
    }


    await exists.save()

    return Promise.resolve("Departement Updated")
  }

  public static deleteDepartementById = async (id: number)=>{
    const  task = await this.findOrFail(id)
    await task.delete()
    return Promise.resolve('Departement deleted')
  }
}


//node ace configure @adonisjs/session    
// npm i @adonisjs/session@6.4.0          