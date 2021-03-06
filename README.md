# StyleBase

[![TypeScript](https://img.shields.io/badge/types-TypeScript-007acc)](https://www.typescriptlang.org)
[![CodeClimate](https://api.codeclimate.com/v1/badges/a40a8f663fdbaa36e28a/maintainability)](https://codeclimate.com/github/VChet/StyleBase/maintainability)
[![CC](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)

Site for UserCSS theme sharing. Supports GitHub and Codeberg repositories.

![Preview](./meta/preview.png)

## Development

### Server

1. Clone repository
1. Install [Node.js](https://nodejs.org/en/download/package-manager/)
1. Install all dependencies `npm install`
1. Copy `config.template.ts`, rename it to `config.ts` and configure

   ```sh
   cp config.template.ts config.ts
   ```

1. Connect to the database (skip if using remote DB)
   - Install [mongoDB](https://www.mongodb.com/download-center/community)
   - Start database `mongod`
1. Start server `npm start`
1. Build client files `npm run client:build`

### [Client](./client/README.md)

## License

This project is licensed under the [MIT License](./LICENSE.md).

## Support

You can support this project on [LiberaPay](https://en.liberapay.com/VChet/) or [Ko-fi](https://ko-fi.com/vchet).
