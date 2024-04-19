import { getAllPosts, createPost, showPost, updatePost, deletePost } from "../controllers/postController"
import { Router } from "express"
import { auth } from "../middleware/auth";

const postRouter = Router();

// Route pour récupérer tous les posts
postRouter.get("/all",auth, getAllPosts);

// Route pour créer un nouveau post
postRouter.post("/add",auth, createPost);

// Route pour récupérer un post spécifique en fonction de son ID
postRouter.get("/:id",auth,showPost);

// Route pour mettre à jour un post spécifique en fonction de son ID
postRouter.put("/edit/:id",auth, updatePost);

// Route pour supprimer un post spécifique en fonction de son ID
postRouter.delete("/delete/:id",auth,deletePost);

// Exporte le routeur pour l'utiliser dans d'autres fichiers

export default postRouter;
