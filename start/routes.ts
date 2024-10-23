/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'


Route.post('signup','AuthController.signup')
Route.post('login','AuthController.login')
Route.get('Departs' , 'EmployeDepartsController.indexx')

Route.group(()=>{
  Route.get('user', 'AuthController.user')
  Route.post('logout', 'AuthController.logout')
  Route.resource('departements' , 'DepartementsController').apiOnly().as('api_departements')
  Route.resource('employes' , 'EmployesController').apiOnly().as('api_employe')

  Route.post('/presences','PresencesController.store')
  Route.get('/presences','PresencesController.index')
  Route.get('/presence','PresencesController.indexx')


  Route.get('Departsemployes' , 'EmployeDepartsController.index')
  Route.get('employesDeparts' , 'EmployeDepartsController.affiche')
}).middleware('apiAuth:web,api')

Route.resource('events', 'EventsController')
Route.get('candidats', 'CandidatesController.index')
Route.get('/candidats/filters', 'CandidatesController.getFilteredCandidates')
Route.post('candidats', 'CandidatesController.store')
Route.put('candidats/:id','CandidatesController.update')
Route.get('candidats/:id','CandidatesController.show')

Route.get('uploads/:file', async ({ params, response }) => {
  const filePath = Application.publicPath('uploads/' + params.file)
  return response.download(filePath)
})

Route.get('valides', 'CandidatesController.getCandidatsValides')
//set global sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';