import { schema, CustomMessages ,rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departement from 'App/Models/Departement'

export default class CreateEmployeValidator {
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
    nom: schema.string([
      rules.required(), 
      rules.alpha(), 
      rules.trim(), 
      rules.maxLength(50)
  ]),
  prenom: schema.string([
      rules.required(), 
      rules.alpha(), 
      rules.trim(), 
      rules.maxLength(50)
  ]),
  email: schema.string([
      rules.required(), 
      rules.email(), //permet de verifier que l'email est valide 
      rules.maxLength(255),
      rules.trim(), 
  ]),
  contact: schema.string([
    rules.required(), 
    rules.trim(),
    rules.maxLength(9)
  ]),
  password: schema.string([
    rules.required(), 
    rules.trim(),
    rules.minLength(8)
  ]),
  role: schema.enum.optional(['user','admin'] as const,[
    rules.trim()
  ]),

  departementId: schema.number([ 
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
      'nom.required': "First name is required",
      'nom.alpha': "The First name must contain letters only",
      'nom.maxLength': "The first name should be maximum 50 characters long",
  
      'prenom.required': "Last name is required",
      'prenom.alpha': "The Last name must contain letters only",
      'lastName.maxLength': "The Last name should be maximum 50 characters long",
  
      'email.required': 'Email is required',
      'email.email': 'Email should be a valid email address',
      'email.maxLength': "Email should be maximum 50 characters long",
  
      'contact.required': 'Contact is required',
      'contact.maxLength': 'Contact should have at least 9 characters',

      'password.required': 'Password is required',
      'password.minLength': 'Password should have at least 8 characters'
  }
}
