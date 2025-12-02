# SecureChat

End-to-end encrypted messaging app with a React Native frontend and Node.js backend.

Messages are encrypted using AES-256 with a unique key and IV for each conversation. Only the sender and receiver can read messages; the server stores only ciphertext.

## Setup

Create a `.env` file with your Firebase keys and AES secrets.

Start the backend:
cd backend &&
npm install &&
node index.js

Start the app (Expo):
npm install &&
npx expo start

## What it does

- Register/login users via Firebase Auth
- Send and receive real-time encrypted messages
- Like and comment on messages
- Notifications for new messages
- Optional stats and journaling features

## Encryption

The `encryption.ts` file handles AES-256 encryption/decryption:
- `SECRET_KEY` and `IV` are loaded from `.env`
- Messages are encrypted before being sent to Firebase
