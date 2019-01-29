const assert = require('assert');
const query = require('../query');
query.testQuery().then(() => {
	assert.equal(query.dirExist("data"), true);
	assert.equal(query.fileExist(`data/database0.data`), true);
	assert.equal(query.fileExist(`data/database1.data`), true);
	assert.equal(query.fileExist(`data/database1-users.meta.json`), true);
}).catch((e) => {
	throw new Error('Error! Wololo!');
});
