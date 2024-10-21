import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CipherService {
  private readonly algorithm = 'aes-256-cbc'; // Symmetric encryption algorithm
  private readonly ivLength = 16; // Initialization vector length for AES
  private readonly keyLength = 32; // AES-256 requires a 32-byte key

  // Encrypt function: Takes a variable-length key and a message to encrypt
  encrypt(message: string, key: string): string {
    // Derive a fixed-length key using PBKDF2 from the provided key
    const salt = crypto.randomBytes(16); // Generate a random salt
    const derivedKey = crypto.pbkdf2Sync(
      key,
      salt,
      100000,
      this.keyLength,
      'sha256',
    );

    // Create a random IV
    const iv = crypto.randomBytes(this.ivLength);

    // Create a cipher using the derived key and IV
    const cipher = crypto.createCipheriv(this.algorithm, derivedKey, iv);

    // Encrypt the message
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the salt, IV, and encrypted message concatenated as a single string
    return `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}`;
  }

  // Decrypt function: Takes a variable-length key and the encrypted message to decrypt
  decrypt(encryptedMessage: string, key: string): string {
    // Split the salt, IV, and encrypted message
    const [salt, iv, encrypted] = encryptedMessage.split(':');

    // Derive the same key from the original key and the salt
    const derivedKey = crypto.pbkdf2Sync(
      key,
      Buffer.from(salt, 'hex'),
      100000,
      this.keyLength,
      'sha256',
    );

    // Create a decipher using the derived key and IV
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      derivedKey,
      Buffer.from(iv, 'hex'),
    );

    // Decrypt the message
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // Return the decrypted message
  }
}
