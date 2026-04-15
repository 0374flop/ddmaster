// 0374flop MIT
// npm i ddmaster

import type * as Types from './types.js';

export { Types };

/**
 * Делает запрос на мастер сервер ДДНета.
 * @returns Сервера ДДНета но в сыром виде.
 */
export async function getrawDDNetServers(): Promise<{ servers: Types.DDNetServer[] } | null> {
    try {
        const response = await fetch('https://master1.ddnet.org/ddnet/15/servers.json');
        const data = await response.json();
        return data as { servers: Types.DDNetServer[] };
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {string} addr - берёт примерно такое "tw-0.7+udp://152.89.254.27:8310"
 * @returns {string|null} 152.89.254.27:8310 возвращает чистый адрес (если addr не валидный то null)
 */
export function convertudptw(addr: string): string | null {
    if (typeof addr !== 'string') return null;
    const match = addr.match(/(\d{1,3}(\.\d{1,3}){3}:\d+)/);
    return match ? match[1]! : null;
}

/**
 * Делает запрос на мастер сервер ДДНета.
 * @param {Object|null} data - опционально, сырая data от getrawDDNetServers(). Если не передана, функция сама её получит.
 * @returns Сервера ДДНета если все пошло хорошо. ['ip:port']
 */
export async function getDDNetServers(data: { servers: Types.DDNetServer[] } | null = null): Promise<string[]> {
    try {
        const servers = data?.servers ?? (await getrawDDNetServers())?.servers;
        if (!servers) return [];

        const ipv4WithPorts: string[] = [];

        for (const server of servers) {
            server.addresses.forEach((addr: string) => {
                const converted = convertudptw(addr);
                if (converted == null) return;
                ipv4WithPorts.push(converted);
            });
        }
        return [...new Set(ipv4WithPorts)];
    } catch (err) {
        console.error(err);
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
export async function findDDNetPlayerByName(
    playerName: string,
    data: { servers: Types.DDNetServer[] } | null = null,
): Promise<Types.DDNetServer[]> {
    if (typeof playerName !== 'string') {
        throw new TypeError('playerName должен быть строкой');
    }

    try {
        const raw = data ?? await getrawDDNetServers();
        if (!raw || !Array.isArray(raw.servers)) return [];

        const resultServers: Types.DDNetServer[] = [];

        for (const server of raw.servers) {
            const info = server.info;
            if (!info || !Array.isArray(info.clients)) continue;

            const hasPlayer = info.clients.some((client: Types.ServerClient) => client.name === playerName);
            if (hasPlayer) resultServers.push(server);
        }
        return resultServers;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export function filterbycommunity(servers: Types.DDNetServer[], community: string): Types.DDNetServer[] {
    return servers.filter(server => server.community === community);
}

export function filterbylocation(servers: Types.DDNetServer[], location: string): Types.DDNetServer[] {
    return servers.filter(server => server.location?.toLowerCase() === location?.toLowerCase());
}

export function filterbylocationincludes(servers: Types.DDNetServer[], location: string): Types.DDNetServer[] {
    return servers.filter(server => server.location?.toLowerCase().includes(location?.toLowerCase()));
}

export async function getinfoserver(address: string): Promise<Types.DDNetServer | undefined> {
    const servers = await getrawDDNetServers();
    return servers?.servers.find((server: Types.DDNetServer) => {
        if (!server.addresses || server.addresses.length === 0) return false;
        return convertudptw(server.addresses[0]!) === address;
    });
}