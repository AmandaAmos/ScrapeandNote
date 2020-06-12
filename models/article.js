let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {
        title: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    excerpt: {
        type: String
    },
    
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
});

let Article = mongoose.model("Article", articleSchema);

module.exports = Article;