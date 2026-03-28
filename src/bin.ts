#!/usr/bin/env node

import { findDDNetPlayerByName, getDDNetServers, getrawDDNetServers, getinfoserver } from './serverlist.js';
import type { DDNetServer } from './types.js';

const [command, ...args] = process.argv.slice(2);

if (command === 'find') {
    findDDNetPlayerByName(args.join(' ')).then(async (servers: DDNetServer[]) => {
        if (servers.length === 0) {
            console.log('Player not found on any server.');
            return;
        }
        console.log(`Count of servers: ${servers.length}`);
        console.log((await getDDNetServers({ servers })).join('\n'));
    }).catch((err: Error) => {
        console.error('Error:', err);
    });

} else if (command === 'list') {
    getDDNetServers().then((servers: string[]) => {
        console.log(servers.join('\n'));
    }).catch((err: Error) => {
        console.error('Error:', err);
    });

} else if (command === 'raw') {
    getrawDDNetServers().then((data) => {
        console.log(JSON.stringify(data, null, 2));
    }).catch((err: Error) => {
        console.error('Error:', err);
    });

} else if (command === 'info') {
    getinfoserver(args[0]!).then((server: DDNetServer | undefined) => {
        if (!server) {
            console.log('Server not found.');
            return;
        }
        console.log(JSON.stringify(server, null, 2));
    }).catch((err: Error) => {
        console.error('Error:', err);
    });

} else {
    console.log('Usage:');
    console.log('  find <playerName> - Найти сервера с игроком');
    console.log('  list              - Получить список всех серверов');
    console.log('  raw               - Получить сырые данные серверов');
    console.log('  info <address>    - Получить информацию о сервере по адресу');
}