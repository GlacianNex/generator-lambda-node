const config = require('config');
const AWS = require('aws-sdk');
const Promise = require('bluebird');

const lambdaSetEnvVars = (lName, lRegion, map) => {
  const lambda = new AWS.Lambda({ region: lRegion });
  const params = {
    FunctionName: lName,
    Environment: { Variables: map }
  };

  return new Promise((resolve, reject) => {
    lambda.updateFunctionConfiguration(params, (err, data) => err ? reject(err) : resolve(data));
  });
};

module.exports = function gruntMain(grunt) {
  grunt.initConfig({
    lambda_package: {
      default: {
        options: {
          include_time: false,
          include_version: false
        }
      }
    },
    lambda_deploy: {}
  });

  require('load-grunt-tasks')(grunt); // eslint-disable-line

  grunt.registerTask('update-all-settings', function asyncTask(region) {
    const done = this.async();
    const map = config.get('deployDefaults.envVariables');
    const lambdas = config.get('deployDefaults.lambdaNames');
    const tasks = lambdas.map(lambdaName => lambdaSetEnvVars(lambdaName, region, map));
    Promise.all(tasks)
      .then(() => done())
      .catch(err => {
        console.log(`Errors: ${err}`);
        done();
      });
  });

  grunt.registerTask('_generate-deploy-tasks', (accountId, region) => {
    const lambdasNames = config.get('deployDefaults.lambdaNames');
    lambdasNames.forEach(name => {
      const lambdaDeployConfig = {
        region,
        enableVersioning: true,
        package: grunt.config('lambda_deploy.default.package'),
        version: grunt.config('lambda_deploy.default.version'),
        archive_name: grunt.config('lambda_deploy.default.archive_name'),
        package_name: grunt.config('lambda_deploy.default.package_name'),
        arn: `arn:aws:lambda:${region}:${accountId}:function:${name}`
      };
      grunt.config(`lambda_deploy.${name}`, lambdaDeployConfig);
    }, this);
  });

  grunt.registerTask('_run-all-deploy-tasks', () => {
    Object.keys(grunt.config('lambda_deploy')).forEach(task => {
      if (task !== 'default') {
        grunt.task.run(`lambda_deploy:${task}`);
      }
    });
  });

  grunt.registerTask('build-deploy-all', function asyncTask(region) {
    const done = this.async();
    new AWS.IAM().getUser({}, (err, data) => {
      const accountId = data.User.Arn.split(':')[4];
      grunt.task.run(['lambda_package', `_generate-deploy-tasks:${accountId}:${region}`, '_run-all-deploy-tasks']);
      done();
    });
  });

  grunt.registerTask('deploy', 'Package and deploy lambda to staging', awsRegion => {
    const region = awsRegion || config.get('deployDefaults.region');
    grunt.task.run([`build-deploy-all:${region}`, `update-all-settings:${region}`]);
  });

  grunt.registerTask('help', () => {});
};
