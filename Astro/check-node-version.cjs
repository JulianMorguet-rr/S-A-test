const semver = require('semver');
const engines = require('./package').engines;

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log(
    `Required node version ${version} not satisfied with current version ${process.version}. Type "nvm use ${version}" to use the right version.`,
  );
  process.exit(1);
}