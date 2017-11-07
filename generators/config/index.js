const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('lambdaNames', {
      type: String,
      required: false,
      default: [''],
      desc: 'Array of lambda names that this project deploys'
    });

    this.option('awsRegion', {
      type: String,
      required: false,
      default: 'us-east-1',
      desc: 'Default AWS region used during deployment'
    });
  }

  _populateTemplate() {
    const lambdaNames = this.options.lambdaNames.replace(' ', '').split(',');
    this.configTemplate.deployDefaults.lambdaNames = lambdaNames;
    this.configTemplate.deployDefaults.region = this.options.awsRegion;
  }

  writing() {
    const defaultFileName = 'default.json';
    const filepath = `${this.destinationRoot()}/config/${defaultFileName}`;
    this.configTemplate = this.fs.readJSON(this.templatePath('default.json'));
    this._populateTemplate();
    this.fs.writeJSON(filepath, this.configTemplate);
  }
};
