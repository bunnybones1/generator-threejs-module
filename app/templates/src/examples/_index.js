var globalize = require('globalizejs');
var <%= moduleNameCapCase %> = {
	examples: {
		SampleExample: require('./SampleExample')
	}
};
globalize('<%= moduleNameCapCase %>', <%= moduleNameCapCase %>);
module.exports = <%= moduleNameCapCase %>;