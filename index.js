const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get('/hello', (req, res) => {
    res.send('Hello World!');   
});

/*
Lista de Endpoints da aplicação CRUD de mensagens
CRUD: Create, Read, Update, Delete (Criar, Ler, Atualizar, Deletar)
- [GET] /mensagens - retorna a lista de mensagens
- [GET] /mensagens/{id} - Retorna apenas uma mensagem pelo id
- [POST] /mensagens - Cria uma nova mensagem
- [PUT] /mensagens/{id} - Atualiza uma mensagem pelo id
- [DELETE] /mensagens/{id} - Remove uma mensagem pelo id
*/

const mensagens = [

    {
        "id": 1,
        "texto": "Essa é a primeira mensagem",
    },
    {
        "id": 2,
        "texto": "Essa é a segunda mensagem",
    },
];
 
// - [GET] /mensagens - retorna a lista de mensagens
app.get('/mensagens', (req, res) => {
    res.send(mensagens.filter(Boolean));
});

// - [GET] /mensagens/{id} - Retorna apenas uma mensagem pelo id
app.get('/mensagens/:id', (req, res) => {
    const id = req.params.id - 1;
    const mensagem = mensagens[id];

    if (!mensagem) {
        res.send('Mensagem não encontrada');
        return;
    }

    res.send(mensagem);
});

// - [POST] /mensagens - Cria uma nova mensagem
app.post('/mensagens', (req, res) => {
    const mensagem = req.body;

if (!mensagem || !mensagem.texto) {
    res.send('Mnsagem inválida.');
    return;
}

    mensagem.id = mensagens.length + 1;
    mensagens.push(mensagem);
    res.send(mensagem);
});

// - [PUT] /mensagens/{id} - Atualiza uma mensagem pelo id
app.put('/mensagens/:id', (req, res) => {
    const id = req.params.id - 1;
    const mensagem = mensagens[id];
    const novoTexto = req.body.texto;

    if (!novoTexto){
        res.send('Mensagem inválida.');
        return;
    }

    mensagem.texto = novoTexto;
   
    res.send(mensagem);
});

// - [DELETE] /mensagens/{id} - Remove uma mensagem pelo id
app.delete('/mensagens/:id', (req, res) => {
    const id = req.params.id - 1;
    delete mensagens[id];
    res.send(`Mensagem removida com sucesso.`);
});

app.listen(port, () => {
    console.info('App rodando em http://localhost:' + port);
});

