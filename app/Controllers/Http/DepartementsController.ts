import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departement from 'App/Models/Departement'
import CreateDepartementValidator from 'App/Validators/CreateDepartementValidator'
import UpdateDepartemenntValidator from 'App/Validators/UpdateDepartemenntValidator'

export default class DepartementsController {

    public index = async ({response}:HttpContextContract) => {
        try {
             const departments = await Departement.all()
             return response.ok(departments)
        } catch (error){
         console.error(error);
         return response.badRequest(error.message)
        }
    }

    public store = async ({request,response}:HttpContextContract)=>{
        const payload = await request.validate(CreateDepartementValidator)
        
        try {
                const result  = await Departement.storeTasks({
                    nom: payload.nom,
                    //auth.user!.id permet d'avoir l'id de l'utilisateur qui est connecter et le point ! envoie simplement un avertissement indiquant que l'objet  user peut etre indefini dans le cas ou aucun utilisateur n'est connecter
                })
                return response.ok({message: result})
        } catch (error) {
            console.error(error);
            return response.badRequest(error.message)
        } 
    }

    public show = async ({params,response}:HttpContextContract) => {
        const { id } = params
        
        try {
            const task = await Departement.findOrFail(id) //cet id repreente la colonne ide notre modele

            return response.ok(task)
        } catch (error) {
            console.error(error.message);
            return response.badRequest(error.message)
        }
    }

    public update = async ({request,params,response}:HttpContextContract)=>{
        const {id} = params
        const  payload = await request.validate(UpdateDepartemenntValidator)
        
        try {
             

            const  result = await Departement.updateDepartement({
                id,
                nom: payload.nom
            })
            
            return response.ok({message : result}) 
        } catch (error) {
            return response.badRequest(error.message)
        }
    }

    public destroy = async ({params,response,}:HttpContextContract)=>{
        

        try {
            const {id} = params

            const  result = await Departement.deleteDepartementById(id)

            return response.ok({message: result})
        } catch (error) {
            return response.badRequest(error.message)
        }
    }
}
