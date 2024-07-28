const bcrypt = require("bcrypt");

async function verify_passwordfn(password, entreprenuer_password) {
  const isMatch = await bcrypt.compare(password, entreprenuer_password);
  return isMatch;
}

module.exports = { verify_passwordfn };
