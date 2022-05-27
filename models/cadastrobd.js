const bd = require('./bd');

const cadastro = bd.sequelize.define('cadastro_usuarios', {
    nome: {
        type: bd.Sequelize.STRING
    },
    cpf: {
        type: bd.Sequelize.STRING(14)
    },
    idade: {
        type: bd.Sequelize.INTEGER
    },
    tipo_atendimento: {
        type: bd.Sequelize.STRING
    }
});

/*criação da tabela
cadastro.sync({force: true});*/

module.exports = cadastro;