import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateEventValidator from 'App/Validators/CreateEventValidator'
import Event from 'App/Models/Event'

export default class EventsController {
    async index({ response }:HttpContextContract) {
        try {
        const candidats = await Event.all()
        return response.ok(candidats)
        } catch (error) {
            return response.badRequest(error.message)
        }
    }

    async store ({ request, response }:HttpContextContract) {
        const  payload = await request.validate(CreateEventValidator)
        try {

            const result  = await Event.storeUser(payload)
            return response.ok({message: result})
        } catch (error) {
            return response.badRequest(error.message)
            
        }
    }
}
