'use strict';

const { exec } = require("child_process");
const chalk = require("chalk");

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
  exec('npm run types', (err, stdout, stderr) => {
    if (stderr.trim().length) {
      const deleteMessage = 'node binary npm was executed with.'

      console.log(chalk.bgRed('Types export error!'))

      const arr = stderr.split(deleteMessage)
      arr.shift()

      console.error(arr.join(deleteMessage))
    } else {
      console.log('📖 Type export complete!')
    }
  })
};
