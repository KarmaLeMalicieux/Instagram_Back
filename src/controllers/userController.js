
import { generateAuthToken } from "../middleware/auth";
import User from "../models/userModel";

const registerUser = async (req, res) => {
  try {
    const newUser = await new User();
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    newUser.name = req.body.name;
    newUser.image = req.body.image;
    console.log(newUser);
    newUser.save();

    const token = generateAuthToken({
      // Nous ne mettrons pas le password pour des raisons de sécurité
      email : newUser.email,
      name : newUser.name,
    });

    console.log("New user saved", newUser)
    res.json({ newUser, token , message: "New user saved"});
  } catch (error) {
    console.error(error);
    res.json({ message: "Error to create user"})
  }
};


const loginUser = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const verify = await user.verifPass(password);

    if (!verify) {
      throw new Error("Invalid Password");
    }

    const token = generateAuthToken({
      id : user._id,
      email : user.email,
      name : user.name,
    });

    console.log("User has been connected", user , token)
    res.json({ message: "Vous êtes connecté", token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
};

export { registerUser, loginUser };
