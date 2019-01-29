const query = require('../file-sql.js');
const fs = require('fs');

module.exports = {
	dirExist: (dir) => {
		try {
			return fs.statSync(dir).size !== undefined;
		} catch (e) {
			return false;
		}
	},
	fileExist: (file) => {
		try {
			return fs.existsSync(file);
		} catch (e) {
			return false;
		}
	},
	testFolders: (database, table) => {
		return new Promise((resolve, reject) => {
			query(`CREATE DATABASE ${database}`, () => {
				query(`USE ${database}`, () => {
					query(`CREATE TABLE ${table}`, () => {
						resolve();
					});
				})
			});
		});
	},
	testQuery: () => {
		return new Promise((resolve, reject) => {
			query('CREATE DATABASE database0');
			query('CREATE DATABASE database1', (err, data) => {
				query('USE database1', (err, data) => {
					query(`
							CREATE TABLE users 
							(    
								uid INT,
								name VARCHAR,   
								start_date DATE,
								status INT,
								priority TINYINT,
								description TEXT,
					)`, (err, data) => {
						query('CREATE DATABASE database2', (err, data) => {
							query('USE database2', (err, data) => {
								query(`CREATE TABLE users2 (id, status) VALUES (1, 0);`, () => {
									resolve();
								});
							});
						});
					});
				});
			});
		});
	}
};
