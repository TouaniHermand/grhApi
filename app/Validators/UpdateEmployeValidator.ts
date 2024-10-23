import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departement from 'App/Models/Departement'

export default class UpdateEmployeValidator {
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
    nom: schema.string.optional([
      rules.maxLength(20),
      rules.trim(),
      rules.minLength(1)
    ]),
    prenom: schema.string.optional([
      rules.maxLength(20),
      rules.trim(),
      rules.minLength(1)
    ]),
    email: schema.string.optional([
      rules.email(),
      rules.trim(),
    ]),
    contact: schema.string.optional([
      rules.maxLength(9),
      rules.trim(),
      rules.minLength(1)
    ]),
    role: schema.enum.optional(['admin','user'] as const),

    departementId: schema.number.optional([ 
      rules.exists({column:Departement.primaryKey, table: Departement.table})
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'nom.minLength': 'Nom should at least 1 character long',
    'nom.maxLength': 'Nom can not be longer than 50 characters',

    'Prenom.minLength': 'Prenom should at least 1 character long',
    'Prenom.maxLength': 'Prenom can not be longer than 50 characters',

    'email.email': 'Email should be a valid email address',
    'email.maxLength': "Email should be maximum 50 characters long",
    
    'contact.minLength': 'Contact should have at least 1 characters',
    'contact.maxLength': 'Contact should have at least 9 characters'
  }
}
