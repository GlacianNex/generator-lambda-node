const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    console.log('sdfjhsdlkfjhsdlkjfh');
    console.log(options);

    this.option('pkgName', {
      type: String,
      required: true,
      desc: 'Package name'
    });

    this.option('pkgDesc', {
      type: String,
      required: true,
      desc: 'Package description'
    });

    this.option('author', {
      type: String,
      required: false,
      default: '',
      desc: 'Package author'
    });

    this.option('repoUrl', {
      type: String,
      required: false,
      default: '',
      desc: 'Repository URL'
    });
  }

  _writePackage() {
    const fileName = 'package.json';
    const filepath = `${this.destinationRoot()}/${fileName}`;
    const pkgContent = this.fs.readJSON(this.templatePath(fileName));
    pkgContent.name = this.options.pkgName;
    if (this.options.pkgDesc) {
      pkgContent.description = this.options.pkgDesc;
    }

    if (this.options.author) {
      pkgContent.author = this.options.author;
    }

    if (this.options.repoUrl) {
      pkgContent.repository = { type: 'git', url: this.options.repoUrl };
    }
    this.fs.writeJSON(filepath, pkgContent);
  }

  _writeIndex() {
    const fileName = 'index.js';
    const from = `${this.templatePath()}/${fileName}`;
    const to = `${this.destinationRoot()}/${fileName}`;
    this.fs.copy(from, to);
  }

  writing() {
    this._writePackage();
    this._writeIndex();
  }
};
