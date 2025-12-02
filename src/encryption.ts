import CryptoJS from 'crypto-js';

// Use a 32-byte (256-bit) key for AES-256. In production, store this securely (e.g., env variable)
export const SECRET_KEY = CryptoJS.enc.Utf8.parse(process.env.AES_KEY!); // 32 chars
export const IV = CryptoJS.enc.Utf8.parse(process.env.AES_IV!); // 16 chars for AES block size

/**
 * Encrypts a message using AES-256-CBC.
 * @param text Plaintext message
 * @returns Base64-encoded ciphertext
 */
export const encryptMessage = (text: string) => {
  const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * Decrypts a message using AES-256-CBC.
 * @param ciphertext Base64-encoded ciphertext
 * @returns Decrypted plaintext message
 */
export const decryptMessage = (ciphertext: string) => {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};