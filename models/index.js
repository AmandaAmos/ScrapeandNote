//exporting an object containing all models

const { db } = require("./article")

module.exports = {
    Article: require("./article"),
    Note: require("./note"),
};