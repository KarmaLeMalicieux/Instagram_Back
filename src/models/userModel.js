import { mongoose, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, min: [6, "Must be at least 6 characters"] },
  image: { type: String, required: true},
});

userSchema.methods.crypto = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
userSchema.methods.verifPass = async (password, elderPassword) => {
  const  result = await bcrypt.compare(password, elderPassword)
  return result
}

const User = mongoose.model("User", userSchema);

export default User;
