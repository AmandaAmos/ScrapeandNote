//exporting an object containing all models

// let { db } = require("./article")

module.exports = {
    Article: require("./article"),
    Note: require("./note"),
}