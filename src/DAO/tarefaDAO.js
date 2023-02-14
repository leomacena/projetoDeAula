// Importa o bd.js para poder usar o banco de dados simulado
const { bdTarefas } = require("../infra/bd");

// Essa classe encapsula o acesso ao Banco de Dados. Todos os métodos abaixos são estáticos. Isso quer dizer que não precisamos instanciar a classe para usá-los e serão chamados pela classe TarefaController... Alguns vão dar retorno e para outros, isso não será necessário
class TarefaDAO {
  static listar() {
    return bdTarefas;
  }

  static inserir(tarefa) {
    bdTarefas.push(tarefa);
  }

  static buscarPorEmail(email) {
    return bdTarefas.find((tarefa) => tarefa.email === email);
  }

  static deletar(email) {
    const tarefa = bdTarefas.find((tarefa) => tarefa.email === email);
    const index = bdTarefas.indexOf(tarefa);
    bdTarefas.splice(index, 1);
    return tarefa;
  }

  static atualizar(email, tarefa) {
    const tarefaAtual = bdTarefas.find((tarefa) => tarefa.email === email);
    const index = bdTarefas.indexOf(tarefaAtual);
    bdTarefas[index] = tarefa;
  }
}

// Exporta a classe
module.exports = TarefaDAO;