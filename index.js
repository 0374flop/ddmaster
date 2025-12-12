/**
 * ddmaster
 */
const lib = require('./serverlist');
// по моему такое декларирование не работает.

module.exports = lib;

if (require.main === module) (async () =>{
    console.log(
        JSON.stringify(
            await lib.getDDNetServers(
                await lib.findDDNetPlayerByName('0374_bober')
            ),
            null,
            1
        )
    ); // тестовый вызов
    // console.log(await lib.getrawDDNetServers());
})();