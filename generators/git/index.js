const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const defaultFileName = '.gitignore';
    this.fs.copy(`${this.templatePath()}/${defaultFileName}`, `${this.destinationRoot()}/${defaultFileName}`);
  }
};
