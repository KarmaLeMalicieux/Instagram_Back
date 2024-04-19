import Post from "../models/postModel";
import User from "../models/userModel";


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { description, image, user } = req.body;

  try {
    // Créer un nouveau post
    const newPost = new Post({ description, image, user });
    await newPost.save();
    

    // Rechercher l'utilisateur en fonction de son nom
    const existingUser = await User.findOne({ name: user });

    // Mettre à jour l'utilisateur pour inclure le nouveau post
    await User.findByIdAndUpdate(existingUser._id, { $push: { posts: newPost._id } });

    res.json({ newPost, message: "Successfully created" });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const showPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({ post });
  } catch (error) {
    res.json({ error: error.message });
  }
};


const updatePost = async (req, res) => {
  try {
    const changePost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      req.body, // Utilise le corps de la requête pour mettre à jour les champs du post
      { new: true } // Renvoie le nouveau post mis à jour
    );
    res.json({ changePost, message: "Successfully update post" });
  } catch (error) {
    res.json({ error: error.message });
  }
};


const deletePost = async (req, res) => {
  try {
    const removePost = await Post.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Successfully delete post" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { getAllPosts, createPost, showPost, updatePost, deletePost };
