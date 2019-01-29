const DDL = require('./lib/ddl');
const Config = require('./lib/config');
// TODO:
let actions = DDL;
let query = (query, callback) => {
	Config.addConfFileIfExist('./config.json');
	let querySplited = query.replace(new RegExp('[\n\t]', 'g'), '').split(' ').filter((e) => e !== '');
	// ['INSERT', 'SELECT', 'UPDATE','DELETE' ];
	let actionSelected = ['USE', 'CREATE', 'DROP', 'ALTER'].indexOf(querySplited[0]) > -1 ? querySplited[0] : '';
	querySplited.splice(0, 1);
	actions[actionSelected](querySplited, callback || function () {});
};
module.exports = query;
