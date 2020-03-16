import crypto from 'crypto';

const algorithm = 'aes-256-ctr';

const str2Hash = str =>
  crypto
    .createHash('sha512')
    .update(str)
    .digest('base64')
    .slice(0, 32);

export const encrypt = (data, key) => {
  key = str2Hash(key);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return { encrypted, iv: iv.toString('base64') };
};

export const decrypt = (data, iv, key) => {
  key = str2Hash(key);
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'base64')
  );

  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
