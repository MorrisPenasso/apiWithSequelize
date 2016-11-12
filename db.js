var db = [];

var Sequelize = require("sequelize");
var sequelize = new Sequelize(undefined, undefined, undefined, {    //create a new sequelize database
    dialect: "sqlite",  //specify the dialect
    storage: __dirname + "/data/database-sequelize.sqlite" // specify the file that will contain the data
});

var model = sequelize.define("myTable", {   //create the first table
    name: { //define a column
        type: Sequelize.STRING  //define a data type of column
    },
    description: {
        type: Sequelize.STRING
    },
    person: {
        type: Sequelize.BOOLEAN
    }

});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.model = model;

module.exports = db;