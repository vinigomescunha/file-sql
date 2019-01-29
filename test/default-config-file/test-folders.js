const assert = require('assert');
const query = require('../query');
const database = 'database0';
const table = 'table0 (id int, name text, status varchar)'
query.testFolders(database, table).then(() => {
	assert.equal(query.dirExist("data"), true);
	assert.equal(query.fileExist(`data/${database}.data`), true);
	assert.equal(query.fileExist(`data/${database}-table0.meta.json`), true);
}).catch((e) => {
	throw new Error('Error! Wololo!');
});
