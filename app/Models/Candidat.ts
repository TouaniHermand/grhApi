import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'



export default class Candidat extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nom: string

  @column()
  public prenom: string

  @column()
  public date_naissance: string

  @column()
  public email: string

  @column()
  public experience_1: string

  @column()
  public experience_2?: string

  @column()
  public experience_3?: string

  @column()
  public diplomes: string

  @column()
  public domaine: string

  @column()
  public lettre_motivation: string

  @column()
  public annees_experience: number

  @column()
  public thumbnail: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static storeUser = async (data: storeCandidat) => {
    const exists = await this.findBy('email',data.email)
    if(exists) {
      return Promise.reject(new Error("User with this email already exists"))
    }

    await this.create({
      nom: data.nom,
      prenom: data.prenom,
      date_naissance: data.date_naissance,
      email: data.email,
      experience_1: data.experience_1,
      experience_2: data.experience_2,
      experience_3: data.experience_3,
      diplomes: data.diplomes,
      domaine: data.domaine,
      lettre_motivation: data.lettre_motivation,
      annees_experience: data.annees_experience,
      thumbnail: data.thumbnailFile,
      status: data.status
    })

    return Promise.resolve("Application submitted successfully")
  }

  public static updateEmploye = async (data:  UpdateCandidateType)=>{
    const  exists = await this.find(data.id)
    if( !exists) {
      return Promise.reject(new Error('Candidate not found'))
    }

    if(data.status)  {
      exists.status = data.status
    }

    await exists.save()

    return Promise.resolve("Status Updated")
  }
}
