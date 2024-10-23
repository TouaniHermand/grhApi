import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCandidateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nom : schema.string([
      rules.alpha(),
      rules.required(),
      rules.trim()
    ]),
    prenom: schema.string([
      rules.alpha(),
      rules.required(),
      rules.trim()
    ]),
    date_naissance: schema.string([
      rules.required()
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(254),
      rules.required(),
    ]),
    experience_1: schema.string([
      rules.required()
    ]),
    experience_2: schema.string.optional({ trim: true }),
    experience_3: schema.string.optional({ trim: true }),

    diplomes: schema.enum(['Baccalaureat', 'BTS', 'Licence', 'Master'] as const, [
      rules.required()
    ]),
    domaine: schema.enum(['communication', 'comptabilite', 'informatique', 'ressources_humaines'] as const, [
      rules.required()
    ]),
    lettre_motivation: schema.string([
      rules.required()
    ]),
    annees_experience: schema.number([
      rules.required()
    ]),
    thumbnailFile: schema.file({
      extnames: ['pdf']
    }),
    status: schema.enum.optional(['Expectation','Reject','Validate'] as const,[
      rules.trim()
    ]),
  })


  public messages: CustomMessages = {
    'required': 'Le champ {{ field }} est obligatoire.',
      'email.email': 'Le champ email doit être une adresse email valide.',
      'maxLength': 'Le champ {{ field }} ne peut pas dépasser {{ argument.0 }} caractères.',
      'enum': 'Le champ {{ field }} doit être une des valeurs prédéfinies.'
  }
}
