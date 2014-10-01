'use strict';
var util = require('util'),
_ = require('lodash'),
path = require('path'),
yeoman = require('yeoman-generator'),
yosay = require('yosay');

_.str = require('underscore.string');

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

_.mixin({ 'capitalize': capitalize });

var ThreejsModuleGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    var moduleName, authorGithubName;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the badass threejs-module generator!'
    ));
    var prompts = [{
      type: 'string',
      name: 'moduleName',
      message: 'What would you like to name this module?',
      default: 'threejs-module-of-doom'
    },
    {
      type: 'string',
      name: 'authorName',
      message: 'What is your name?',
      default: 'Tomasz Dysinski'
    },
    {
      type: 'string',
      name: 'authorUrl',
      message: 'What is your home page?',
      default: 'http://www.bunnybones.com'
    },
    {
      type: 'string',
      name: 'authorGithubName',
      message: 'What is your github accont name?',
      default: 'bunnybones1'
    }];

    this.prompt(prompts, function (answers) {
      this.moduleName = moduleName = answers.moduleName;
      this.moduleNameCapCase = _.str.capitalize(_.str.camelize(answers.moduleName));
      this.authorName = answers.authorName;
      this.authorUrl = answers.authorUrl;
      this.authorGithubName = authorGithubName = answers.authorGithubName;

      var prompts2 = [{
        type: 'string',
        name: 'repoUrl',
        message: 'What is your repo URL for this module?',
        default: 'http://github.com/' + authorGithubName + '/' + moduleName
      },
      {
        type: 'string',
        name: 'homePageUrl',
        message: 'What is your home page URL for this module?',
        default: 'http://github.com/' + authorGithubName + '/' + moduleName
      },
      {
        type: 'string',
        name: 'bugsUrl',
        message: 'What is your bug tracking URL for this module?',
        default: 'http://github.com/' + authorGithubName + '/' + moduleName + '/issues'
      }];

      this.prompt(prompts2, function (answers2) {
        this.homePageUrl = answers.homePageUrl;
        this.repoUrl = answers.repoUrl;
        this.bugsUrl = answers.bugsUrl;
        done();
      }.bind(this));
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('tasks');
      this.dest.mkdir('examples');
      this.dest.mkdir('examples/01_Basic');

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_Gruntfile.js', 'Gruntfile.js');
      this.template('_README.md', 'README.md');

      //dirs
      this.template('src/core/_index.js', 'src/core/index.js');
      this.template('src/examples/_index.js', 'src/examples/index.js');
      this.template('src/examples/_SampleExample.js', 'src/examples/SampleExample.js');

      this.src.copy('src/core/utils/_CanvasGraph.js', 'src/core/utils/CanvasGraph.js');
      this.src.copy('src/core/utils/_degToRad.js', 'src/core/utils/degToRad.js');
      this.src.copy('src/core/utils/_Events.js', 'src/core/utils/Events.js');
      this.src.copy('src/core/utils/_FPS.js', 'src/core/utils/FPS.js');
      this.src.copy('src/core/utils/_index.js', 'src/core/utils/index.js');
      this.src.copy('src/core/utils/_MaterialTestFactory.js', 'src/core/utils/MaterialTestFactory.js');
      this.src.copy('src/core/utils/_PerformanceTweaker.js', 'src/core/utils/PerformanceTweaker.js');
      this.src.copy('src/core/utils/_URLParams.js', 'src/core/utils/URLParams.js');

      this.src.copy('src/core/view/_DOMMode.js', 'src/core/view/DOMMode.js');
      this.src.copy('src/core/view/_index.js', 'src/core/view/index.js');
      this.src.copy('src/core/view/_RenderManager.js', 'src/core/view/RenderManager.js');
      this.src.copy('src/core/view/_RenderStats.js', 'src/core/view/RenderStats.js');
      this.src.copy('src/core/view/_View.js', 'src/core/view/View.js');

      this.template('examples/01_Basic/_index.html', 'examples/01_Basic/index.html');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('gitignore', '.gitignore');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = ThreejsModuleGenerator;
