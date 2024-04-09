import { mongoose, Schema } from "mongoose";


const postSchema = new Schema({
    // Chaque poste aura un utilisateur émétteur
  user: {type: Schema.Types.ObjectId, ref:"User"},
  description: {type:String, required:true},
  image: {type:String, required:true},
    //Chaque poste aura une date de création, qui aura pour référence la date de maintenant
  createAt: {type:Date, default:Date.now()}}
);



const Post = mongoose.model("Post", postSchema);




export default Post;