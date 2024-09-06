const mongoose = require("mongoose")

const librarySchema = mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    publishedYear:{type:Number,required:true},
    description:{type:String,required:true},
    language:{type:String,required:true},
    createdAt: {type:Date,default:Date.now},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    userName:{type:String,required:true}

})

const LibraryModel = mongoose.model("library",librarySchema)

module.exports = LibraryModel