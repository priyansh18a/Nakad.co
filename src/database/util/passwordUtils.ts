import crypto from "crypto";

export function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  return {
    salt,
    hash: genHash,
  };
}

export function validPassword(password, hash, salt) {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
}
