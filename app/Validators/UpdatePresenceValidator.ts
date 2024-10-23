import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePresenceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    heure_depart: schema.string([
      rules.required(),
      rules.trim()
    ]),
    heure_arrivee: schema.string([
      rules.required(),
      rules.trim()
    ]),
    mois: schema.string([
      rules.required(),
      rules.trim()
    ]),
  })

  public messages: CustomMessages = {
    'heure_depart.required': 'heure_depart is required',
    'heure_arrivee.required': 'heure_arrivee is required',
    'mois.required': 'le mois est requis',

    'description.required': 'Decription is required',
    'description.maxLength': 'Description can not be longer than 400 characters',
    
  }
}