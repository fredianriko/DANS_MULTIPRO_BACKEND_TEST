'use strict'

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
require('dotenv').config()
const env = 'development'
const config = require('../config/server_config').database[env]
const db = {}


//assign environment variabel value to sequelize
let sequelize;
if(config){
    sequelize = new Sequelize({
        host: config.host,
        dialect: config.dialect,
        username: config.username,
        password: config.password,
        database: config.database
    })
}

// scalable database model configuration
fs.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf('.') !== 0 ) && (file !== basename) && (file.slice(-3) === '.js')//return array of model file
})
.forEach(file => {
    //each file concat with directory name, and pass middleware sequelize and Sequelize.Datatypes
    //you need to already define the model file, eor you will get error
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //assign model path name to db.name
    db[model.name] = model 
})

//assign each model name to db object
Object.keys(db).forEach(modelName => {
    if(db[modelName].associate){
        db[modelName].associate(db)
    }
})


db.sequelize = sequelize;
db.Sequelize = Sequelize


module.exports = db