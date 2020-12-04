# StyleBase

[![CC](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)

## Development

### Server

1. Clone repository
1. Install [Node.js](https://nodejs.org/en/download/package-manager/)
1. Install all dependencies `npm install`
1. Copy `config.template.js`, rename it to `config.js` and configure
   ```sh
   cp config.template.js config.js
   ```
1. Connect to database (skip if using remote DB)
   - Install [mongoDB](https://www.mongodb.com/download-center/community)
   - Start database `mongod`
1. Start server `npm start`

### [Client](./client/README.md)
