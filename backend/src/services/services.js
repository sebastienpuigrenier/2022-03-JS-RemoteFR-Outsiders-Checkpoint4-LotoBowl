const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const hashPassword = (myPlaintextPassword) => {
  return bcrypt.hashSync(myPlaintextPassword, saltRounds);
};

const verifPassword = (myPlaintextPassword, hashedPassword) => {
  return bcrypt.compareSync(myPlaintextPassword, hashedPassword);
};

const JWTTokenCreator = (userEmail, userPseudo, userAdmin) => {
  return jwt.sign(
    { email: userEmail, pseudo: userPseudo, admin: userAdmin },
    process.env.PRIVATE_KEY
  );
};

module.exports = {
  hashPassword,
  verifPassword,
  JWTTokenCreator,
};
