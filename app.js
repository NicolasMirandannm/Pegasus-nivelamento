const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cadastro = require("./models/cadastrobd");
const moment = require("moment");


//CONFIGURAÇÕES
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main', 
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rota
app.get('/', function(req, res) {
    res.render('Cadastro-de-atendimento');
});

// lista de antendimentos
app.get('/Atendimentos', function(req, res) {
    cadastro.findAll().then(function(cadastro_usuarios) {
        res.render('Atendimentos', {atendimentos: cadastro_usuarios});
    });
    
});

app.get('/del-atendimento/:id', function(req, res) {
    cadastro.destroy({
        where: {'id': req.params.id}
    }).then(function() {
        res.redirect("/Atendimentos");
    }).catch(function(err) {
        res.send("Falha no cancelamento do atendimento: Erro " + err);
    });
})

// guia de cadastro

app.post('/lista_atendimento', function(req, res) {
    cadastro.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        idade: req.body.idade,
        tipo_atendimento: req.body.tipo_atendimento
    }).then(function(){
        //redirecionamento
        const senha = function() {
            return Math.random().toString(36).slice(-6);
        }
        res.send("Atendimento cadastrado com sucesso! " + 'Sua senha é: "' + senha() + '"')
    


        //res.send("Atendimento cadastrado com sucesso!")
    }).catch(function(err) {
        res.send("Erro: Não foi possivel cadastrar o atendimento! erro: " + err)
    })

    /*res.send("Nome: " + req.body.nome + 
    "<br>CPF: " + req.body.cpf + 
    "<br>Idade: " + req.body.idade + 
    "<br>Tipo de atendimento: " + req.body.tipo_atendimento + "<br>");*/
});

app.listen(8080);
