const exec = (command, options) => {
  require("child_process").execSync(command, { stdio: "inherit", ...options });
};

const withinDirectory = (directory, callback) => {
  const ex = (command, options) =>
    exec(command, { cwd: directory, ...options });
  callback(ex);
};

const log = msg => {
  console.log(`🦋  ${msg}`);
};

const packageName = require("hashwords")()
  .randomStr()
  .toLowerCase()
  .replace(/ /g, "-");

log(`Creating package: ${packageName}`);

const dirName = `${process.cwd()}/${packageName}`;

exec(`mkdir -p ${dirName}`);

const index = `
  <script>
    window.appName = "${packageName}"
  </script>
  <div id="app"></div>
  <script src="./script.js"></script>
`;

const script = `
  import React from "react";
  import ReactDOM from "react-dom";

  const App = () => {
    return <h1>{window.appName}</h1>
  };

  const elem = document.querySelector("#app");

  ReactDOM.render(<App />, elem);
`;

const babelrc = `
{
  "presets": [
    "react"
  ]
}
`;

const eslint = `
{
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-undef": "error",
    "no-unused-vars": "warn",
    "no-unreachable": "warn"
  }
}
`;

const gitignore = `
node_modules
.cache
dist
`;

const writeFile = (name, data) => {
  require("fs").writeFileSync(`${dirName}/${name}`, data);
};

console.log(`Writing files...`);
writeFile("index.html", index);
writeFile("script.js", script);
writeFile(".babelrc", babelrc);
writeFile(".eslintrc.json", eslint);
writeFile(".gitignore", gitignore);

withinDirectory(dirName, exec => {
  exec(`npm init --yes`);
  log("Installing dependencies...");
  exec(`npm install eslint --save-dev`);
  exec(`npm install parcel-bundler babel-preset-react`);
  exec(`git init`);
  log("Opening Visual Studio Code...");
  exec(`code .`);
  log("Running Parcel...");
  exec(`npx parcel index.html --open`, { stdio: "inherit" });
});
