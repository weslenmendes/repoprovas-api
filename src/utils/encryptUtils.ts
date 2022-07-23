import bcrypt from 'bcrypt';

export function encrypt(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export function decryptAndCompare(password: string, encryptedPassword: string) {
  if (!encryptedPassword) return true;

  return bcrypt.compareSync(password, encryptedPassword);
}
