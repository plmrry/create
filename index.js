const cwd = process.cwd();

const log = msg => {
  console.log(`🦋  ${msg}`);
};

const execOptions = {
  stdio: "inherit",
  cwd
};

const exec = command => {
  log(command);
  require("child_process").execSync(command, execOptions);
};

// Copy template files
const templateDir = `${__dirname}/template`;
exec(`rsync -a ${templateDir}/ ${cwd}`);

// Write out a .gitignore
const gitignore = `
node_modules
.cache
dist
`;
require("fs").writeFileSync(`${cwd}/.gitignore`, gitignore);

// Add package.json
exec(`npm init --yes`);

// Add scripts to package.json
const pkg = require(`${cwd}/package.json`);
pkg.scripts = {
  start: `parcel src/index.html`
};
require("fs").writeFileSync(
  `${cwd}/package.json`,
  JSON.stringify(pkg, null, 2)
);

// Install dependencies
const devDependencies = ["eslint", "eslint-plugin-react", "parcel-bundler", "react@next", "react-dom@next"];
log("Installing dependencies...");
exec(`npm install ${devDependencies.join(" ")} --save-dev`);
exec(`git init`);
log("Opening Visual Studio Code...");
exec(`code .`);
// log("Running Parcel...");
// exec(`npx parcel src/index.html --open`);
