import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employe from 'App/Models/Employe';
import CreateEmployeValidator from 'App/Validators/CreateEmployeValidator';
import LoginValidator from 'App/Validators/LoginValidator';

const HEADER_KEY = 'App-User-Agent'
const CLIENT_AGENT = {
    WEB: 'TodoHutWebApp/1.0',
    MOBILE: 'TodoHutMobileApp/1.0'
}


export default class AuthController {
    public async signup({ request,response }:HttpContextContract) {
        const  payload = await request.validate(CreateEmployeValidator)
        
        try {
            const  result = await Employe.storeUser({
                nom: payload.nom,
                prenom: payload.prenom,
                email: payload.email,
                contact: payload.contact,
                password: payload.password,
                role: payload.role,
                departementId: payload.departementId
            })

            return response.ok({ message: result})
            /*Avec l'option API En cas de succes  avec express js la reponse renvoyer est sous cette forme return response.status(200).json({ message: 'This is it '}) alors que avec adonis on utilise la methode ok  */
        } catch(error){
            console.log(error);
            return response.badRequest(error.message)    
        }
        
    }

    public async login({request,response,auth}:HttpContextContract) {
        const payload = await request.validate(LoginValidator)

        const agent = request.header(HEADER_KEY)

        try {
            switch (agent) {
                case CLIENT_AGENT.WEB: {
                    await auth.use('web').attempt(payload.email,payload.password)
                    return response.ok({message:'Logged in'})
                }

                case CLIENT_AGENT.MOBILE: {
                  const user =  await auth.use('api').attempt(payload.email,payload.password)
                  return user.token
                } 

                default: 
                throw new Error('Invalid user agent')
            }
        } catch (error){
            return response.badRequest(error.message)
        }

    }

    public user = async ({response,auth}:HttpContextContract)=>{
        return response.ok(auth.user)
    }

    public logout = async ({response,auth,request}:HttpContextContract)=>{
        const agent = request.header(HEADER_KEY)

        try {
            switch (agent) {
                case CLIENT_AGENT.WEB: {
                    await auth.use('web').logout()
                    break
                }

                case CLIENT_AGENT.MOBILE: {
                  await auth.use('api').logout()
                  break
                } 

                default: 
                throw new Error('Invalid user agent')
            }
            return response.ok({message:"Disconnection"})
        } catch (error){
            return response.badRequest(error.message)
        }
    }
}
