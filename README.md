# @plmrry/now

Create a [Parcel.js](https://parceljs.org/) app right now.

Not to be confused with [Now by zeit.co](https://zeit.co/docs).

## Usage

```bash
npx @plmrry/now
```

## What it does

- Creates a funny app name
- Creates a directory
- Creates:
  - `index.html`
  - `script.js`
  - `.babelrc`
  - `.eslintrc.json`
  - `.gitignore`
- Runs `npm init --yes`, which creates a `package.json`
- Installs:
  - `eslint`
  - `parcel-bundler`
  - `babel-preset-react`
- Initializes a new Git repository
- Opens VSCode
- Runs Parcel
