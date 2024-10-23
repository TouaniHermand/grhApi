import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employe from 'App/Models/Employe'
import CreateEmployeValidator from 'App/Validators/CreateEmployeValidator'
import UpdateEmployeValidator from 'App/Validators/UpdateEmployeValidator'

export default class EmployesController {

    public index = async ({response}:HttpContextContract) => {
        try {
             const employes = await Employe.all()
             return response.ok(employes)
        } catch (error){
         console.error(error);
         return response.badRequest(error.message)
        }
    }

    public store = async ({request,response}:HttpContextContract)=>{
        const payload = await request.validate(CreateEmployeValidator)

        try {

            const result  = await Employe.storeUser({
                nom: payload.nom,
                prenom: payload.prenom,
                email: payload.email,
                contact: payload.contact,
                password: payload.password,
                role: payload.role,
                departementId: payload.departementId
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
            const task = await Employe.findOrFail(id) //cet id repreente la colonne ide notre modele

            return response.ok(task)
        } catch (error) {
            console.error(error.message);
            return response.badRequest(error.message)
        }
    }
    

    public update = async ({request,params,response}:HttpContextContract)=>{
        const {id} = params
        const  payload = await request.validate(UpdateEmployeValidator)
        
        try {
             

            const  result = await Employe.updateEmploye({
                id,
                nom: payload.nom,
                prenom: payload.prenom,
                email: payload.email,
                contact: payload.contact,
                role: payload.role,
                departementId: payload.departementId
            })
            
            return response.ok({message : result}) 
        } catch (error) {
            return response.badRequest(error.message)
        }
    }

    public destroy = async ({params,response,}:HttpContextContract)=>{
        

        try {
            const {id} = params

            const  result = await Employe.deleteEmployeById(id)

            return response.ok({message: result})
        } catch (error) {
            return response.badRequest(error.message)
        }
    }
}
