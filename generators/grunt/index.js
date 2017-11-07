const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const defaultFileName = 'gruntfile.js';
    this.fs.copy(`${this.templatePath()}/${defaultFileName}`, `${this.destinationRoot()}/${defaultFileName}`);
  }
};
