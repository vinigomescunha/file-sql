let query = require('../file-sql');

query('CREATE DATABASE foo', (err, data) => {
  query('DROP DATABASE foo', (err, data) => {});
});

query('CREATE DATABASE dummy', (err, data) => {
  query('USE dummy', (err, data) => {
    console.log('USE dummy');
    query(`CREATE TABLE table2 (field1,field2) VALUES (value1, value2);`, (err, data) => {
      query(`CREATE TABLE table3 (fieldx,fieldx1) VALUES (valuex, valuex1);`);
    });
  });
});