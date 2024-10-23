import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email : schema.string([
      rules.email(),
      rules.required(),
      rules.trim()
  ]),

  password: schema.string([
      rules.minLength(8),
      rules.trim(),
      rules.required()
  ])
  })

  public messages: CustomMessages = {
    'email.email': 'Email should be a valid email address',
    'email.required': 'email is required',

    'password.required': 'password is required',
    'password.minLength': 'Password should have at least 8 characters'
  }
}
