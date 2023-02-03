const express = require('express')
const app = express();
const port = 3000;

app.use(express.json());

const { userGet, userPost } = require('./controller/usuario-controller');
userGet(app);
userPost(app);

const { taskGet, taskPost } = require('./controller/tarefa-controller');
taskGet(app);
taskPost(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})