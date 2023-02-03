function userGet(app) {
  app.get('/usuario', (req, res) => {
    res.send('Rota ativada com GET e recurso USUARIO: valores de USUARIO devem ser retornados')
  });
}

function userPost(app) {
  app.post('/usuario', (req, res) => {

    // const test = req.body;
    // test = {
    //   "nome":"Maria",
    //   "Idade":26
    // }

    console.log(req.body);

    res.send('Rota ativada com POST e recurso USUARIO: valores de USUARIO devem ser retornados')
  }); 
}


module.exports = { userGet, userPost };
