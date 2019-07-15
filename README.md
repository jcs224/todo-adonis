# Adonis todo app w/ websockets

## Prerequisites
- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Usage
Clone this repo on your local machine/server, `cd` into it, then:
```
cp .env.example .env
```
Make edits to the `.env` file. Make sure the `HOST`, `PORT`, and `APP_URL` are correct. If running this on your local machine, in most cases the defaults should be fine and no changes are needed.

Then, run these commands:
```
yarn install
npx adonis migration:run
npx adonis serve --dev
```

Visit `http://127.0.0.1:3333` in your browser, and you should be able to start playing with the app.
