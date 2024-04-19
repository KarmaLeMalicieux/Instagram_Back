import { mongoose, Schema } from "mongoose";


const postSchema = new Schema({
    // Chaque poste aura un utilisateur émétteur
  user: {type: String, required: true},
  likesCount: { type: Number, default: 0 },
  description: {type:String, required:true},
  image: {type:String, required:true},
    //Chaque poste aura une date de création, qui aura pour référence la date de maintenant
  createAt: {type:Date, default:Date.now()}}
);



const Post = mongoose.model("Post", postSchema);




export default Post;