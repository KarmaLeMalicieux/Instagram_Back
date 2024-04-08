import express from "express";
import volleyball from "volleyball";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const app = express();
const port = process.env.PORT;


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[ 📼 DATABASE 📼 ] MongoDB est connecté !!`);
}


app.use(express.json());
app.use(volleyball)
app.use(cors());

app.get("/", (req, res) => res.send(" Salut !! Ici c'est Paris !"));
app.use("/auth", authRouter);

app.listen(port, () =>
  console.log(`[SERVER] is running on http://localhost:${port}`)
);