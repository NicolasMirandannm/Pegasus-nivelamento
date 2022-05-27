const Sequelize = require("sequelize");
const sequelize = new Sequelize('usuarios', 'atendimento', 'Katarina02*', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports= {
    Sequelize: Sequelize,
    sequelize: sequelize
}