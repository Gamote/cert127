# cert127

[![npm version](https://img.shields.io/npm/v/cert127)](https://www.npmjs.com/package/cert127) [![npm downloads/month](https://img.shields.io/npm/dm/cert127)](https://www.npmjs.com/package/cert127) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Gamote/cert127/blob/main/LICENSE)

Small utility to generate **🔒 trusted** self-signed certificates for local development.

## Prerequisites

This package requires `mkcert` to be installed on your system. Please follow the [installation instructions](https://github.com/FiloSottile/mkcert#installation) for your platform.

## Installation

```shell
# With Yarn
yarn add cert127

# or with npm
npm i cert127
```

## Usage

```ts
import cert127 from 'cert127';

const { key, cert } = await cert127();
```

## Example

Let's create a quick Fastify server with the listening socket configured for TLS:

```ts
import cert127 from 'cert127';
import Fastify from 'fastify';

/**
 * Run the server!
 */
const start = async () => {
  const fastify = Fastify({ https: await cert127() });

  fastify.get('/secure', (req, reply) =>
    reply.send("There is no place like 127.0.0.1 🏠"));

  await fastify.listen({ port: 3000 });
};

void start();
```

Now you can open [https://localhost:3000/secure](https://localhost:3000/secure) in your browser and see:
> There is no place like 127.0.0.1 🏠

> **IMPORTANT: This will not work on production, as it is meant only for local development.**

## ✨ Roadmap

- [ ] Make it a class, so we offer more ways to retrieve the cert
- [ ] Add a check to see if `mkcert` is installed and if not, install it
- [ ] Make sure that `mkcert` was initialized: `mkcert -install`
- [ ] Add a check to see if the certificate is already created and ask the user if they want to overwrite it
- [ ] Add more options for customizations (e.g. hosts, expiration time etc.)
- [ ] Add a way to revoke the certificate
- [ ] Add a way to check if the certificate is valid
- [ ] Allow creating multiple certificates
- [ ] Add tests
- [ ] Add CI/CD
- [ ] Add ESLint and Prettier
- [ ] Add sync method
