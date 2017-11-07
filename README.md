# QuickStart: AWS Lambda Node

This package is meant to provide quick scaffolding for AWS Lambda function that use Node. The goal is to give you basic tools needed to jump start the develoment.

Below is the list of components that this template initilizes.

## Usage

### Install [Yeoman](http://yeoman.io/)

```javascript
npm install -g yo
```

### Install [generator-aws-lambda-node]()

```javascript
npm install -g generator-aws-lambda-node
```

### Run

#### Create New Project Directory

```javascript
mkdir my-project && cd $_
```

#### Run generator-aws-lambda-node

```javascript
yo generator-aws-lambda-node
```

## Initialized Components

### Package.json

+ Basic information
  + Name
  + Description
  + Author

+ Dev Dependencies
  + [ESLint](https://github.com/eslint/eslint) - linting framework
  + [ESLint AirBnB](https://www.npmjs.com/package/eslint-config-airbnb) - linting standards
  + [Grunt](https://www.npmjs.com/package/grunt) - deployment automation
  + [Chai](https://www.npmjs.com/package/chai) - assertion framework
  + [Sinon](https://www.npmjs.com/package/sinon) - mocking framework
  + [Mocha](https://github.com/mochajs/mocha) - testing framework

+ Dependencies
  + [config](https://www.npmjs.com/package/config) - configuration framework
  + [aws-sdk](https://www.npmjs.com/package/aws-sdk) - AWS SDK
  + [bluebird](https://www.npmjs.com/package/bluebird) - Promise framework

### Git

+ Adding .gitignore

### Node

+ Basic lambda entry point

### Grunt

+ Package, and deploy project code to lambda(s)
+ Populate lambda environment variables

### ESLint

+ Add AirBnB linting rule
+ QoL rule overrides that make sense in context of lambda development

### Config

+ Default configuration file
+ AWS Deployment Defaults
  + Default AWS deploy region
  + Deployment lambda names
  + Environment vairalbes for lambda
