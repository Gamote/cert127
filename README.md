# 🔐 makecert

`makecert` is a small utility to generate self-signed certificates for local development.

## Prerequisites

This package requires `mkcert` to be installed on your system. Please follow the [installation instructions](https://github.com/FiloSottile/mkcert#installation) for your platform.

## Installation

```shell
# With Yarn
yarn add makecert

# or with npm
npm i makecert
```

## Usage

```ts
import makeCert from 'makecert';

const { key, cert } = await makeCert();
```

## ✨Roadmap

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

_There is no place like 127.0.0.1 🏠_
