const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const defaultFileName = '.eslintrc';
    this.fs.copy(`${this.templatePath()}/${defaultFileName}-main`, `${this.destinationRoot()}/${defaultFileName}`);
    this.fs.copy(`${this.templatePath()}/${defaultFileName}-test`, `${this.destinationRoot()}/test/${defaultFileName}`);
  }
};
