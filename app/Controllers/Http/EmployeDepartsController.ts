import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departement from 'App/Models/Departement'
import Employe from 'App/Models/Employe'

export default class EmployeDepartsController {
    index = async ({response}:HttpContextContract)=>{
        try {
            const employes = await Departement.query().preload('employes') // Charge la relation department
            return response.ok(employes)
       } catch (error){
        console.error(error);
        return response.badRequest(error.message)
       }
    } 

    public indexx = async ({response}:HttpContextContract) => {
        try {
             const departments = await Departement.all()
             return response.ok(departments)
        } catch (error){
         console.error(error);
         return response.badRequest(error.message)
        }
    }

    affiche = async ({response}:HttpContextContract)=>{
        const employees = await Employe.query()
         .select('employes.*', 'departements.nom') // Sélectionne les colonnes nécessaires
         .innerJoin('departements', 'employes.departement_id', 'departements.id') // Jointure avec la table departments
         return response.ok(employees)
    }
}
