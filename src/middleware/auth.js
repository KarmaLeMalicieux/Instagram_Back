import jwt from "jsonwebtoken";
import "dotenv/config";


const auth = (req, res, next) => {
  // Récupérer le token JWT de l'en-tête Authorization
  const tokenHeader = req.headers.authorization;
  const token = tokenHeader.split(' ')[1];

  // Vérifier si le token existe
  if (!token) {
    return res
      .status(401)
      .json({ message: " Access denied, no Token ! " });
  }

  try {
    // Vérifier la validité du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user)
    next(); // Passer au middleware suivant
  } catch (error) {
    // En cas d'erreur de vérification du token
    res.status(401).json({ message: "Invalid Token ! " });
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};


export { auth, generateAuthToken };
