import { DateTime } from 'luxon'
import { BaseModel, column,beforeSave,BelongsTo, belongsTo, hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import Departement from './Departement'
import Hash from '@ioc:Adonis/Core/Hash'  
import Presence from './Presence'

export default class Employe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom:string

  @column()
  public prenom: string

  @column()
  public email: string

  @column()
  public contact: string

  @column({serializeAs:null})
  public password: string

  @column()
  public role: string

  @column()
  public departement_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Departement)
  public departement: BelongsTo<typeof Departement>

  @hasMany(() => Presence, {
    localKey: 'id',
    foreignKey: 'employe_id'
  })
    public presences : HasMany<typeof Presence>
  

  @beforeSave()
  public static async hashPassword (admin: Employe) {
    if (admin.$dirty.password) {
      admin.password = await Hash.make(admin.password)
    }
  }

  public static storeUser = async (data: StoreUserType) => {
    const exists = await this.findBy('email',data.email)
    if(exists) {
      return Promise.reject(new Error("User with this email already exists"))
    }

    await this.create({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      contact: data.contact,
      password: data.password,
      role: data.role,
      departement_id: data.departementId
    })

    return Promise.resolve("User created")
  }

  public static updateEmploye = async (data: UpdateEmployeType)=>{
    const  exists = await this.find(data.id)
    if( !exists) {
      return Promise.reject(new Error('User not found'))
    }

    if(data.nom) {
      exists.nom = data.nom
    }

    if(data.prenom) {
      exists.prenom = data.prenom
    }

    if(data.email) {
      exists.email = data.email
    }

    if(data.contact) {
      exists.contact = data.contact
    }

    if(data.role){
      exists.role = data.role
    }

    if(data.departementId) {
      exists.departement_id = data.departementId
    }

    await exists.save()

    return Promise.resolve("Employe Updated")
  }

  public static deleteEmployeById = async (id: number)=>{
    const  task = await this.findOrFail(id)
    await task.delete()
    return Promise.resolve('Employe deleted')
  }

}
