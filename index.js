const lib = require('./testserverlist');
module.exports = lib;

if (require.main === module) (async () =>{
    console.log(JSON.stringify(await lib.getrawDDNetServers(), null, 2))
})();