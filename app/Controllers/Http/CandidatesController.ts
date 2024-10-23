import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Candidat from 'App/Models/Candidat'
import CreateCandidateValidator from 'App/Validators/CreateCandidateValidator'
import UpdateCandidateValidator from 'App/Validators/UpdateCandidateValidator'
import { DateTime } from 'luxon'



export default class CandidatesController {
    async index({ response }:HttpContextContract) {
        try {
        const candidats = await Candidat.all()
        return response.ok(candidats)
        } catch (error) {
            return response.badRequest(error.message)
        }
    }
    
    
    public async getFilteredCandidates({ request, response }: HttpContextContract) {
        try {
          const { experience, domain, diplome, age } = request.qs()
    
          const query = Candidat.query()
          
          const experience2 = parseInt(experience)
          if (experience2) {
            query.where('annees_experience', '>=', experience2)
          }
    
          if (domain) {
            query.where('domaine', domain)
          }
    
          if (diplome) {
            query.where('diplomes', diplome)
          }
    
          if (age) {
            const ageNumber = parseInt(decodeURIComponent(age), 10)
            if (isNaN(ageNumber)) {
              return response.status(400).json({ message: 'Invalid age parameter' })
            }
    
            const cutoffDate = DateTime.now().minus({ years: ageNumber }).toISODate()
            query.where('date_naissance', '<=', cutoffDate)
          }
    
          const candidats = await query.exec()
          return response.ok(candidats)
        } catch (error) {
          return response.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des candidats.',
            error: error.message
          })
        }
      }
    
    async store ({ request, response }) {
        const  payload = await request.validate(CreateCandidateValidator)
        try {
            const pdfFile = request.file('thumbnailFile')
            if (pdfFile) {
              // Générer un nom aléatoire pour le fichier PDF
              const newName = `${payload.nom}${payload.email}.${pdfFile.extname}`

              // Déplacer le fichier PDF vers le disque local
              await pdfFile.moveToDisk('/',{name: newName})
              payload.thumbnailFile = newName
            }
            const result  = await Candidat.storeUser(payload)
            return response.ok({message: result})
        } catch (error) {
            return response.badRequest(error.message)
            
        }
    }

    public update = async ({request,params,response}:HttpContextContract)=>{
      const {id} = params
      const  payload = await request.validate(UpdateCandidateValidator)
      
      try {
           

          const  result = await Candidat.updateEmploye({
              id,
              status: payload.status
          })
          
          return response.ok({message : result}) 
      } catch (error) {
          return response.badRequest(error.message)
      }
  }

  public show = async ({params,response}:HttpContextContract) => {
    const { id } = params
    
    try {
        const task = await Candidat.findOrFail(id) //cet id repreente la colonne ide notre modele

        return response.ok(task)
    } catch (error) {
        console.error(error.message);
        return response.badRequest(error.message)
    }
  }


  public async getCandidatsValides({ response }: HttpContextContract) {
    try {
      const candidatsValides = await Candidat.query().where('status', 'Validate').exec()
      return response.ok(candidatsValides)
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
      
