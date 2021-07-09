/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
  if (process.env.NODE_ENV === 'development') {
    const fs = require('fs')
    const path = require('path')
    const { exec } = require('child_process');
    const { importFiles, findFilesFromMultipleDirectories } = require('strapi-to-typescript/dist/importer');
    const config = require('../../.stsconfig.js')

    exec('npm run types');
  
    // 테이블명 타입 생성
    findFilesFromMultipleDirectories(...config.input).then(filesnames => {
      importFiles(filesnames).then(models => {
        const collectionNames = models.filter(model => model._filename.includes('packages/strapi/api')).map(model => model.collectionName)
        fs.writeFileSync(path.resolve(process.cwd(), config.output, 'collection.ts'), `export type TCollection = '${collectionNames.join("' | '")}';\n`)
      })
    })
  }
};
