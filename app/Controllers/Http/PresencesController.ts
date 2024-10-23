import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employe from 'App/Models/Employe'

import Presence from 'App/Models/Presence'
import CreatePresenceValidator from 'App/Validators/CreatePresenceValidator'


export default class PresencesController {

    public async index({ response }: HttpContextContract) {
        try {
          const employes = await Employe.query().preload('presences');
          return response.ok(employes);
        } catch (error) {
          console.error(error);
          return response.badRequest(error.message);
        }
    }

    public async indexx({ response }: HttpContextContract) {
        try {
          const employes = await Presence.all()
          return response.ok(employes);
        } catch (error) {
          console.error(error);
          return response.badRequest(error.message);
        }
    }


    public store = async ({request,response,auth}:HttpContextContract)=>{
        const payload = await request.validate(CreatePresenceValidator)
        
        try {
            const result  = await Presence.storeTasks({
                heure_arrivee: payload.heure_arrivee,
                heure_depart: payload.heure_depart,
                mois: payload.mois,
                jours_present: payload.jours_present,
                employeId: auth.user!.id
                //auth.user!.id permet d'avoir l'id de l'utilisateur qui est connecter et le point ! envoie simplement un avertissement indiquant que l'objet  user peut etre indefini dans le cas ou aucun utilisateur n'est connecter
            })
            return response.ok({message: result})
        } catch (error) {
            console.error(error);
            return response.badRequest(error.message)
        } 
    }

    

}
