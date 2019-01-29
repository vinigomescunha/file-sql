class Config {
  static setConfFile(file) {
    this.confFile = require(require('path').resolve(file));
  }
  static getConf() {
    return this.confFile || require('./config-default.json');
  }
  static addConfFileIfExist(path) {
    if (require('fs').existsSync(path)) {
      Config.setConfFile(path);
    }
  }
  static setDbName(databaseName) {
    this.databaseName = databaseName;
  }
  static getDbName() {
    return this.databaseName;
  }
  static mountDbPath(databaseName) {
    return Config.getDataDir() + '/' + databaseName + Config.getDataExtension();
  }
  static mountTablePath(tableName) {
    return Config.getDataDir() + '/' + Config.getDbName() + '-' + tableName + Config.getTableExtension();
  }
  static getDataDir() {
    return Config.getConf().dataDir;
  }
  static getDataExtension() {
    return Config.getConf().dataExtension ;
  }
  static getTableExtension() {
    return Config.getConf().tableExtension;
  }
}
module.exports = Config;