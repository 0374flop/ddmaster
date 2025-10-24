const lib = require('./testserverlist');
const getDDNetServers = lib.getAllDDNetServersIPv4WithPorts

module.exports = { getDDNetServers };