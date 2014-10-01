/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('GraphicalMathPixi:app', function () {
  before(function (done) {
    console.log(path.join(os.tmpdir(), './temp-test'));
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        phone: '555 555 5555',
        size: 'Large',
        quantity: 1,
        toppings: ['a', 'p'],
        beverage: 'Pepsi',
        comments: 'Great jorb!',
        prize: 'cake'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
