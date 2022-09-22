import mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        autoCreate: true
    },
    value:{
        type:String,
        required: true
    },
    priority: {
        type: Number,
        required:true
    }
})

export default mongoose.model("todos",TodoSchema)