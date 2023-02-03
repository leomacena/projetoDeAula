function taskGet(app) {
  app.get('/tarefa', (req, res) => {
    res.send('Rota ativada com GET e recurso USUARIO: valores de USUARIO devem ser retornados')
  });
}

function taskPost(app) {
  app.post('/tarefa', (req, res) => {
    res.send('Rota ativada com POST e recurso USUARIO: valores de USUARIO devem ser retornados')
  }); 
}


module.exports = { taskGet, taskPost };
