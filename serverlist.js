// 0374flop MIT
// npm i ddmaster

"use strict";

const DebugLoger = require('loger0374');
const loger = new DebugLoger('ddmaster', false, true, null, true);

if (typeof fetch === 'undefined') {
    try {
        require.resolve('node-fetch');
        loger.log('Using node-fetch polyfill');
    } catch (e) {
        throw new Error('Node.js <18, npm install node-fetch');
    }

    const nodeFetch = require('node-fetch');
    global.fetch = nodeFetch.default || nodeFetch;
    loger.log('Polyfilled fetch with node-fetch');
}

/**
 * Делает запрос на мастер сервер ДДНета.
 * @returns Сервера ДДНета но в сыром виде.
 */
async function getrawDDNetServers() {
    try {
        const response = await fetch('https://master1.ddnet.org/ddnet/15/servers.json');
        if (!response.ok) throw new Error(`Ошибка при запросе: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        loger.error(error);
        return null;
    }
}

/**
 * 
 * @param {string} addr - берёт примерно такое "tw-0.7+udp://152.89.254.27:8310"
 * @returns {string|null} 152.89.254.27:8310 возвращает чистый адрес (если addr не валидный то null)
 */
function convertudptw(addr) {
    if (typeof addr !== 'string') return null;
    const match = addr.match(/(\d{1,3}(\.\d{1,3}){3}:\d+)/);
    loger.log('convertudptw', addr, '->', match ? match[1] : null);
    return match ? match[1] : null;
}

/**
 * Делает запрос на мастер сервер ДДНета.
 * @param {Object|null} data - опционально, сырая data от getrawDDNetServers(). Если не передана, функция сама её получит.
 * @returns Сервера ДДНета если все пошло хорошо. ['ip:port']
 */
async function getDDNetServers(data = null) {
    try {
        const servers = data || (await getrawDDNetServers()).servers;
        if (!servers) {
            loger.error('Нет серверов в данных');
            return [];
        }

        const ipv4WithPorts = [];

        for (const server of servers) {
            server.addresses.forEach(addr => {
				const converted = convertudptw(addr);
				if (converted == null) return;
                ipv4WithPorts.push(converted);
            });
        }
        return [...new Set(ipv4WithPorts)];
    } catch (err) {
        loger.error('Ошибка getDDNetServers:', err.message);
        return [];
    }
}

/**
 * Ищет игрока по имени на всех серверах ДДНета.
 * Возвращает ПОЛНУЮ инфу о серверах (как getrawDDNetServers),
 * но только те сервера, где есть игрок с таким именем.
 *
 * @param {string} playerName - имя игрока, ищется строго через ===
 * @param {Object|null} data - опционально, сырая data от getrawDDNetServers().
 * @returns {Promise<Array>} Массив серверов (как в getrawDDNetServers().servers),
 * на которых найден игрок.
 */
async function findDDNetPlayerByName(playerName, data = null) {
    if (typeof playerName !== 'string') {
        throw new TypeError('playerName должен быть строкой');
    }

    try {
        const raw = data || await getrawDDNetServers();
        if (!raw || !Array.isArray(raw.servers)) {
            loger.error('Некорректные данные серверов');
            return [];
        }

        const resultServers = [];

        for (const server of raw.servers) {
            const info = server.info;
            if (!info || !Array.isArray(info.clients)) continue;

            const hasPlayer = info.clients.some(client => client.name === playerName);
            if (hasPlayer) {
                resultServers.push(server);
            }
        }
        return resultServers;
    } catch (err) {
        loger.error('Ошибка при поиске игрока:', err);
        return [];
    }
}

function filterbycommunity(servers, community) {
    return servers.filter(server => server.community === community);
}

function filterbylocation(servers, location) {
    return servers.filter(server => server.location?.toLowerCase() === location?.toLowerCase());
}

function filterbylocationincludes(servers, location) {
    return servers.filter(server => server.location?.toLowerCase().includes(location?.toLowerCase()));
}

async function getinfoserver(address) {
    const servers = await getrawDDNetServers();
    const server = servers.servers.find(server => 
        convertudptw(server.addresses[0]) === address
    );
    return server;
}

module.exports = { getDDNetServers, getrawDDNetServers, convertudptw, findDDNetPlayerByName, filterbycommunity, filterbylocation, filterbylocationincludes, loger, getinfoserver };