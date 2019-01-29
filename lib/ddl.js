/*
  CREATE DATABASE name
  CREATE TABLE name
  DROP DATABASE name
  DROP TABLE name
  ALTER TABLE table ADD fieldx varchar(255)|int|tinyint
*/
const fs = require('fs');
const Config = require('./config');
const subactions = {
  CREATE: {
    TABLE: (querySplited, callback) => {
      // TODO
      let queryJoined = JSON.stringify(querySplited.join('|'));
      let tableName = Config.mountTablePath(querySplited[0]);
      fs.writeFile(tableName, queryJoined, (err) => {
        callback(null, true);
      });
    },
    DATABASE: (querySplited, callback) => {
      let databasePath = Config.mountDbPath(querySplited[0]);
      fs.mkdir(Config.getDataDir(), err => {
        fs.writeFile(databasePath, '', (err) => {
          callback(err, JSON.parse(true));
        });
      });
    }
  },
  DROP: {
    TABLE: (querySplited, callback) => {
      let tableName = Config.mountTablePath(querySplited[0]);
      fs.unlink(tableName, queryJoined, (err) => {
        callback(null, true);
      });
    },
    DATABASE: (querySplited, callback) => {
      fs.unlink(Config.mountDbPath(querySplited[0]), (err) => {
        callback(err, JSON.parse(true));
      });
    }
  }
};

const dispathSubActionCreateDrop = (indexSubAction, querySplited, callback) => {
  // CREATE TABLE|DATABASE name
  // DROP TABLE|DATABASE name
  for (var i in querySplited) {
    actionSelected = ['TABLE', 'DATABASE'].indexOf(querySplited[i]) > -1 ? querySplited[i] : '';
    if (actionSelected !== '') break;
  }
  let index = querySplited.indexOf(actionSelected);
  querySplited.splice(index, 1);
  subactions[indexSubAction][actionSelected](querySplited, callback);
};

const CREATE = (querySplited, callback) => {
  dispathSubActionCreateDrop('CREATE', querySplited, callback);
};
const USE = (querySplited, callback) => {
  // USE database
  Config.setDbName(querySplited[0]);
  fs.readFile(Config.mountDbPath(querySplited[0]), "utf8", (err, data) => {
    callback(err, data || null);
  });
};

const DROP = (querySplited, callback) => {
  dispathSubActionCreateDrop('DROP', querySplited, callback);
};

const ALTER = (querySplited, callback) => {
  // TODO:
};

module.exports = {
  CREATE,
  USE,
  DROP
};