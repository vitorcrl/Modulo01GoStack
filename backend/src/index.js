const express = require('express');

const app = express();

app.get('/project', (request,response) =>{
  return response.json({ message: 'hello world'});
});

app.listen(3333);

// para iniciar    node src/index.js  para fechar ctrl+c