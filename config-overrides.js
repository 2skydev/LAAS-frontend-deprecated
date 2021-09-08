const path = require("path");
const { appPath } = require("react-scripts/config/paths");
const jsconfig = require(path.resolve(appPath, "tsconfig.path.json"));

module.exports = {
  webpack: (config) => {
    /*
     * add jsconfig.json paths
     */
    const aliasPaths = Object.keys(jsconfig.compilerOptions.paths).reduce(
      (acc, key) => ({
        ...acc,
        [key.replace("/*", "")]: path.resolve(
          appPath,
          jsconfig.compilerOptions.paths[key][0].replace("/*", "")
        ),
      }),
      {}
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliasPaths,
    };

    // return updated config
    return config;
  },
};
