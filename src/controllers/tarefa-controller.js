const Tarefa = require('../models/Tarefa.js')

// Classe importada exclusivamente para fazer o acesso ao Banco de Dados. Para qualquer operação, ela será utilizada
const TarefaDAO = require('../DAO/TarefaDAO.js')


class tarefaController {
    static rotas(app){
        // Rota para os recursos tarefa. O parâmtro das rotas aparece na primeira parte entre aspas simples e logo depois são chamados os métodos da classse
        app.get('/tarefa', tarefaController.listar)
        app.get('/tarefa/email/:email', tarefaController.buscarPorEmail)
        app.post('/tarefa', tarefaController.inserir)
        app.put('/tarefa/email/:email', tarefaController.atualizaTarefa)
        app.delete('/tarefa/email/:email', tarefaController.deletarTarefa)
    }



    // Abaixo todos os métodos dessa classe são estáticos, isso quer dizer que podemos usá-los, SEM a necessidade de instanciá-los usando a palavrinha NEW
    
    static listar(req, res){
        // Chama a classe tarefaDAO com o método listar, q agora é resposável pelo acesso ao Banco de Dados. Todas as vezes, a partir dessa REFATORAÇÃO, que nosso sistema tiver que acessar o banco, quem vai fazer isso, será a classe tarefaDAO. 
        const tarefas = TarefaDAO.listar()

        // Devolve a lista de tarefas e o status code 200. Quer dizer que a rquisição ocorreu com sucesso.
        res.status(200).send(tarefas)
    }



    static inserir(req, res){
        // Cria um novo tarefa recebendo as informações que vem do corpo da requisição através do req.body     
        const tarefa = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            status: req.body.status,
            data: req.body.data
        }

        // Classe TarefaDAO é chamada com o método inserir Adiciona o tarefa na lista de tarefas        
        TarefaDAO.inserir(tarefa)

        // Padrão POST, o status code de recurso criado é o 201, ou seja, houve a criação de um recurso. Abaixo personalizamos a resposta que será mostrada, caso o cadastro se realize. Será mostrada as mensagens abaixo e também o objeto cadastrado
        res.status(201).send({"Menssagem": "Usuário Criado com Sucesso", "Novo Usuário: ": tarefa})
       
    }



    static buscarPorEmail(req, res){
        // Classe TarefaDAO é chamada com o método de Busca ao email na lista de tarefas
        const tarefa = TarefaDAO.buscarPorEmail(req.params.email)

        // Se o tarefa não for encontrado, devolve um erro
        if(!tarefa){
            // O status code que informa se o conteúdo não foi encontrado
            res.status(404).send('Usuário não encontrado')
            return
        }
        // Se o tarefa for encontrado, devolve o tarefa e mostra o status code 200, que quer dizer operação bem suceddida
        res.status(200).send(tarefa)
    }



    static atualizaTarefa(req,res) {
        //Classe TarefaDAO é chamada com o método de busca pelo email
        const tarefa = TarefaDAO.buscarPorEmail(req.params.email)

        // Se o email de usuário não for encontrado, entra no if e dá um 404 (status code 404), que quer dizer que o conteúdo não foi encontrado
        if (!tarefa) {
            res.status(404).send('Usuário não encontrado')
            return
        }

        // se não entrou no if, quer dizer que existe o email procurado e ele está cadastrado em nosso banco, então é criada as chaves nome, email, senha em nosso objeto criado logo no início do método e serão passada para elas os valores vindo do corpo da requisição, via req.body.
        tarefa.nome = req.body.nome
        tarefa.email = req.body.email
        tarefa.senha = req.body.senha

        //Classe TarefaDAO é chamada com o método atualizar, que será reponsável por acessar o banco e cadastrar o objeto usuário já preenchido com as informações que vieram do corpo via req.body na requisição. Observe que estamos enviando o usuário criado e preenchido como o req.body logo acima. Também passamos o email que veio da URL do nosso endpoint, pois na clase TarefaDAO será verificado o suário certo que será feita a atualização. Lembre-se que quem faz o acesso ao banco agora é a classe DAO, por isso estamos passando para ela
        TarefaDAO.atualizar(req.params.email, tarefa)
        
        // Tudo correndo certo, uma mensagem será informada com o status de bem sucedido (200). Também personalizamos um pouco o response (resposta) para mostrar como ficaram as informações do usuário.
        res.status(200).send({"Menssagem": "Usuário Criado com Sucesso", "Novo Usuário: ": tarefa})
    }



    static deletarTarefa(req, res){
        // Busca o email na lista de tarefas através da classe TarefaDAO com o método deletar, passando por parâmetro o email que virá da URL em nossa rota, ou seja, em nosso endpoint através do req.params.email
        const tarefa = TarefaDAO.deletar(req.params.email)
        // Se o tarefa não for encontrado, devolve um erro staus code 404
        if(!tarefa){
            res.status(404).send('Usuário não encontrado')
            return
        }

        // Status code 204 NÃO Devolve o tarefa deletado || O 200 é solicitação bem sucedida. Pode ser usada aqui, se for usada, a resposta abaixo pode ser mostrada
        res.status(204).send({"Mensagem: ": `O usuário do email ${tarefa.email} foi deletado`} )
    }
}

//  Exporta o tarefaController para poder ser acessado a partir de outros arquivos
module.exports = tarefaController