const path = require('path');
const webpack = require('webpack');
const { appPath, appSrc } = require('react-scripts/config/paths');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const jsconfig = require(path.resolve(appPath, 'tsconfig.path.json'));

module.exports = {
  webpack: config => {
    /*
     * add global imports
     */
    config.plugins.push(
      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
    );

    /*
     * add jsconfig.json paths
     */
    const aliasPaths = Object.keys(jsconfig.compilerOptions.paths).reduce(
      (acc, key) => ({
        ...acc,
        [key.replace('/*', '')]: path.resolve(
          appPath,
          jsconfig.compilerOptions.paths[key][0].replace('/*', ''),
        ),
      }),
      {},
    );

    config.resolve.plugins = config.resolve.plugins.filter(
      plugin => !(plugin instanceof ModuleScopePlugin),
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliasPaths,
    };

    /*
     * change typescript rule
     */
    const tsRule = config.module.rules[1].oneOf[2];
    tsRule.include = undefined;
    tsRule.exclude = /node_modules/;

    // return updated config
    return config;
  },
};
