const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'string',
        name: 'pkgName',
        required: true,
        default: this.appname.replace(' ', '-'),
        message: 'Package name:'
      },
      {
        type: 'string',
        name: 'pkgDesc',
        message: 'Package description:'
      },
      {
        type: 'string',
        name: 'author',
        message: 'Package author:'
      },
      {
        type: 'string',
        name: 'repoUrl',
        message: 'Repository URL:'
      },
      {
        type: 'string',
        name: 'lambdaNames',
        required: true,
        message: 'Name(s) of the lambdas this project deploys (comma separated):'
      },
      {
        type: 'input',
        name: 'awsRegion',
        message: 'Default AWS Region (us-east-1, us-west-1, etc):'
      }
    ]).then(answers => {
      this.props = answers;
    });
  }

  config() {
    this.composeWith(require.resolve('../config'), {
      lambdaNames: this.props.lambdaNames,
      awsRegion: this.props.awsRegion
    });
  }

  eslint() {
    this.composeWith(require.resolve('../eslint'));
  }

  git() {
    this.composeWith(require.resolve('../git'));
  }

  node() {
    this.composeWith(require.resolve('../node'), {
      pkgName: this.props.pkgName,
      pkgDesc: this.props.pkgDesc,
      author: this.props.author,
      repoUrl: this.props.repoUrl
    });
  }

  grunt() {
    this.composeWith(require.resolve('../grunt'));
  }
};
