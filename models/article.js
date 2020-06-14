let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {
        title: String,
       // require: true
       
    },
    link: {
        type: String,
       // require: true
    },
    
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
});

let Article = mongoose.model("Article", articleSchema);

module.exports = Article;