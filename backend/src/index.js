const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');



const app = express();

app.use(cors());
app.use(express.json());
/**
 * metodos http:Get
 *
 * 
 * tipos de parametros:
 * 
 * Query params: Filtros e paginacao
 * Route params: Identificar Recursos(atualizar, deletar)
 * Request body: Conteudo na hora de criar ou editar um recurso.(JSON)
 */

 /*Middleware:
 * interceptador de requisicoes, que interrompe totalmenta a requisicao
 *e altera dados da requisicao
 */ 


const projects = [];

function logRequest(request, response, next) {
const { method, url } = request;

const logLabel = `[${method.toUpperCase()}] ${url}`;

console.time(logLabel);

next();//proximo middleware


console.timeEnd(logLabel)

}

function validadeProjectId(request, response, next){
const { id } =  request.params;

if (!isUuid(id)){
  return response.status(400).json({ error:'invalid project id'})
}
next();
}


app.use(logRequest);
app.use('/projects/:id', validadeProjectId)


app.get('/projects', (request,response) =>{

const { title} = request.query;

const results = title
? projects.filter(project =>project.title.includes(title))
: projects;


  return response.json(results);
});

app.post('/projects', (require, response) =>{

  const {title, owner} = require.body;

  const project = {id: uuid(), title, owner};

  projects.push(project);
  
  return response.json(project);
});

app.put('/projects/:id', (request, response) =>{
  const { id } = request.params;
  const {title, owner} = request.body;

const projectIndex = projects.findIndex(project => project.id === id)

if (projectIndex < 0){

  return response.status(400).json({error:'Project not found'});
} 

const project = {
  id,
  title, 
  owner

};

projects[projectIndex] = project

  return response.json(project);
});

app.delete('/projects/:id', (request, response) =>{
  const { id } =  request.params

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0){
  
    return response.status(400).json({error:'Project not found'});
  } 
  
projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () =>{
  console.log('🚀 Back-end Started!!!🚀 Ctrl+C to disable')/* iniciar yarn dev */
});