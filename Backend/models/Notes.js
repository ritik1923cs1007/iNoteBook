const mongoose=require('mongoose');
const { Schema } = mongoose;
const NoteSchema=new Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
  },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
   tag:{
        type:String,
        required:true
   }, 
   
    Date:{
        type:Date,
        default:Date.Now
    }
})
module.exports=mongoose.model('note',NoteSchema);