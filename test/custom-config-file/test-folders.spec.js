const assert = require('assert');
const query = require('../query');
const config = require('./config.json');
const database = 'database0';
const table = 'table0';
const tableInfo = `${table} (id int, name text, status varchar)`;
query.testFolders(database, table).then(() => {
	assert.equal(query.dirExist(`${config.dataDir}`), true);
	assert.equal(query.fileExist(`${config.dataDir}/${database}${config.dataExtension}`), true);
	assert.equal(query.fileExist(`${config.dataDir}/${database}-${table}${config.tableExtension}`), true);
}).catch((e) => {
	throw new Error('Error! Wololo!');
});