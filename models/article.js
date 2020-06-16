const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
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

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;