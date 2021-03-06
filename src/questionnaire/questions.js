const inquirer = require('inquirer');
const fs = require('fs');

const utils = require('../utils');

/**
 * Run the prompts to get the details for the project
 * @method promptProjectDetails
 * @param  {Object} defaults
 * @param  {String} defaults.projectName    The default name for the project
 * @param  {String} defaults.version        The default version for the project
 * @param  {String} defaults.license        The default license for the project
 * @param  {String} defaults.gitUserName    The git username setup for the project
 * @param  {String} defaults.gitUserEmail   The git username setup for the project
 * @param  {String} defaults.template       The name for the default template
 * @param  {Array} licenses                 The list of options for licenses
 * @param  {Array} testingPkgs              The list of options for testingPkgs
 * @param  {Array} templates                The list of options for templates
 * @return {Promise}
 */
async function promptProjectDetails(defaults, licenses, testingPkgs, templates) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your project name?',
      default: defaults.projectName,
    },

    {
      type: 'list',
      name: 'template',
      message: 'What kind of project are you creating?',
      choices: templates,
      default: defaults.template,
    },

    {
      type: 'input',
      name: 'description',
      message: 'How would you describe your project?',
    },

    {
      type: 'input',
      name: 'version',
      message: 'What version do you want to start with?',
      default: defaults.version,
    },

    {
      type: 'input',
      name: 'keywords',
      message: 'Provide a comma-separated list of keywords:',
      filter: ans => JSON.stringify(ans.split(',')),
    },

    {
      type: 'list',
      name: 'license',
      message: 'Please select a license',
      choices: licenses,
      default: defaults.license,
    },

    {
      type: 'input',
      name: 'author.name',
      message: 'What is your name?',
      default: defaults.gitUserName,
    },

    {
      type: 'input',
      name: 'author.email',
      message: 'What is your email?',
      default: defaults.gitUserEmail,
    },

    {
      type: 'input',
      name: 'author.url',
      message: 'What is your website?',
    },

    {
      type: 'confirm',
      name: 'isPrivate',
      message: 'Is this project private?',
      default: false,
    },

    {
      type: 'input',
      name: 'projectURL',
      message: 'What is your project website?',
    },

    {
      type: 'checkbox',
      name: 'testPackages',
      message: 'Which test packages do you want to include?',
      choices: testingPkgs,
    },

    {
      type: 'confirm',
      name: 'useGithub',
      message: 'Would you like to create a GitHub repository?',
    },
  ]);
}

/**
 * Run the prompts to get the details for the remote git
 * @method promptGitRemoteDetails
 * @return {Promise}
 */
async function promptGitRemoteDetails() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'git.sshUrl',
      message: 'What git remote will you be using?',
    },

    {
      type: 'input',
      name: 'issueTracker',
      message: 'Where is your issue tracker?',
    },
  ]);
}

/**
 * Run the prompts to geth the path for the auth file
 * @method promptSettingsFile
 * @param  {String} settingsPath  The default path for the settings file
 * @return {Promise}
 */
async function promptSettingsFile(settingsPath) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'settingsPath',
      message: 'What is the path for the create-nodejs-settings.json file?',
      default: settingsPath,
      validate: (ans) => {
        const path = utils.files.resolvePath(ans);
        if (path && fs.existsSync(path)) {
          return true;
        }
        return 'You should introduce a real path for the create-nodejs-settings.json';
      },
    },
  ]);
}

/**
 * Run the prompts to get the github user
 * @method promptGithubUser
 * @param  {String} user The current user on the auth file
 * @return {Promise}
 */
async function promptGithubUser(user) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'github.user',
      message: 'What is your Github user?',
      default: user,
    },
  ]);
}

/**
 * Run the prompts to get the github token
 * @method promptAuthToken
 * @param  {String} user  The current github user on the auth file
 * @param  {String} token The current github user on the auth file
 * @return {Promise}
 */
async function promptAuthToken(user, token) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'github.token',
      message: `What is your GitHub token for user ${user}?`,
      default: token,
    },
  ]);
}

/**
 * Run the prompt to confirm if the user wants to update the token
 * @method promptUpdateToken
 * @return {Promise}
 */
async function promptUpdateToken() {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'updateToken',
      message: 'Do you want to update the settings file with this token?',
    },
  ]);
}

/**
 * The questions for the questionnaire
 * @module questions
 */
module.exports = {
  promptProjectDetails,
  promptGitRemoteDetails,
  promptSettingsFile,
  promptAuthToken,
  promptUpdateToken,
  promptGithubUser,
};
