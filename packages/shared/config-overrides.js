const path = require('path')
const webpack = require('webpack')
const { appSrc, appPath } = require('react-scripts/config/paths')

const theme = require('./src/themes/default.ts')
const jsconfig = require(path.resolve(appPath, 'jsconfig.json'))

module.exports = {
  webpack: config => {
    /*
     * add global imports
     */
    config.plugins.push(new webpack.ProvidePlugin({
      _: 'lodash'
    }))



    /*
     * add jsconfig.json paths
     */
    const aliasPaths = Object.keys(jsconfig.compilerOptions.paths).reduce((acc, key) => ({
      ...acc,
      [key.replace('/*', '')]: path.resolve(appPath, jsconfig.compilerOptions.paths[key][0].replace('/*', ''))
    }), {})

    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliasPaths
    }



    /*
     * sass loader
     */
    const rules = config.module.rules[1].oneOf

    const sassRuleIndex = rules.findIndex(rule => String(rule.test).includes('(scss|sass)'))
    const sassLoaders = rules[sassRuleIndex].use
    const sassLoader = sassLoaders[sassLoaders.length - 1]
    const sassModuleLoaders = rules[sassRuleIndex + 1].use
    const sassModuleLoader = sassModuleLoaders[sassModuleLoaders.length - 1]

    const resourcesLoader = {
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(appSrc, 'resources.scss')
      }
    }

    let sassPrepend = ``

    Object.keys(theme.palette).forEach(key => {
      sassPrepend += `$${key}: ${theme.palette[key]};\n`
    })

    // 테마 변수 설정
    sassModuleLoader.options.prependData = sassLoader.options.prependData = sassPrepend
    
    // resources loader 추가
    sassLoaders.push(resourcesLoader)
    sassModuleLoaders.push(resourcesLoader)

    // return updated config
    return config
  }
}
