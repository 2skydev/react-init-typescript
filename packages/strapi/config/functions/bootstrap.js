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
        let collectionNames = models
          .filter(model => model._filename.includes('packages/strapi/api') || model._filename.includes('packages\\strapi\\api'))
          .map(model => model.collectionName.replace(/\_/g, '-'))

        collectionNames.push('users')
        collectionNames.sort()

        fs.writeFileSync(path.resolve(process.cwd(), config.output, 'collection.ts'), `export type TCollection = '${collectionNames.join("' | '")}';\n`)
        fs.writeFileSync(path.resolve(process.cwd(), config.output, 'models.json'), `${JSON.stringify(models, null, 2)}`)
      })
    })

    // const users = require('../../../../convertUsers.json')

    // users.filter(x => x.email).slice(0, 300).map(async x => {
    //   x.role = 1
    //   x.provider = 'local'

    //   x.password = await strapi.plugins['users-permissions'].services.user.hashPassword(
    //     { password: '123123' }
    //   );
  
    //   strapi.query('user', 'users-permissions').create(x);
    // })


    // fs.writeFileSync(path.resolve(process.cwd(), '../../', 'convertUsers.json'), `${JSON.stringify(convertUsers, null, 2)}`)
  }
};
