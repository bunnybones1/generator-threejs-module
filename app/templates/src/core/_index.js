var globalize = require('globalizejs');
var <%= moduleNameCapCase %> = {
	sampleFunction: function(){
		console.log("sample core function!");
	},
	utils: require('./utils'),
	view: require('./view')
};
globalize('<%= moduleNameCapCase %>', <%= moduleNameCapCase %>);
module.exports = <%= moduleNameCapCase %>;