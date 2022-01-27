# Password Manager Server
This is the backend server for my [post-quantum password manager](https://github.com/Areezy/password-manager). 

It perfoms a key exchange with the [proxy server](https://github.com/Areezy/keyexchange-proxy) and verifies the digital signature to establish post-quantum keys for secure communication.

## Built With 
- NodeJS
- Express
- Bcrypt
- Liboqs-Node
- MongoDB

## Installation Guide
The installation guide below only works on linux machines.

First, to use the post-quantum algorithms, you first need to install the [liboqs dependencies](https://github.com/open-quantum-safe/liboqs#quickstart)

Also, OPENSSL version 1.1.1 or greater should be installed on your system.

This server makes use of the [Nodejs wrappers for liboqs](https://github.com/TapuCosmo/liboqs-node)

Once, this is done, a mongoDB database also needs to be setup. 
> The connection string for the database should be provided to the "DATABASE_CONNECTION_STRING" environment variable

Other environment variables which need to be populated include 
- "SECRET" which is used to sign the JWTs
- "KEY_ENCRYPT_KEY" which is used to encrypt and decrypt the exchanged post-quantum key. The encrypted version of the key is stored in a database.

Once the above is done,
```
git clone
npm install
npm run dev
```

