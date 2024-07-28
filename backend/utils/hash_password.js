const bcrypt = require("bcrypt");

async function hash_passwordfn(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);
  return hashed_password;
}

module.exports = { hash_passwordfn };
