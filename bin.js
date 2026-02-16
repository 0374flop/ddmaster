#!/usr/bin/env node

const ddmaster = require('./index');

const [command, ...args] = process.argv.slice(2);

if (command === "find") {
    ddmaster.findDDNetPlayerByName(args.join(" ")).then(async servers => {
        if (servers.length === 0) {
            console.log("Player not found on any server.");
            return;
        }

        console.log(`Count of servers: ${servers.length}`);
        console.log((await ddmaster.getDDNetServers(servers)).join("\n"));
    }).catch(err => {
        console.error('Error:', err);
    });
} else if (command === "list") {
    ddmaster.getDDNetServers().then(servers => {
        console.log(servers.join("\n"));
    }).catch(err => {
        console.error('Error:', err);
    });
} else if (command === "raw") {
    ddmaster.getrawDDNetServers().then(servers => {
        console.log(JSON.stringify(servers, null, 2));
    }).catch(err => {
        console.error('Error:', err);
    });
} else if (command === "info") {
    ddmaster.getinfoserver(args[0]).then(server => {
        console.log(JSON.stringify(server, null, 2));
    }).catch(err => {
        console.error('Error:', err);
    });
} else {
    console.log("Usage:");
    console.log("  find <playerName> - Найти сервера с игроком");
    console.log("  list - Получить список всех серверов");
    console.log("  raw - Получить сырые данные серверов");
    console.log("  info <address> - Получить информацию о сервере по адресу");
}