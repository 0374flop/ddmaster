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
        console.error(error);
        return null;
    }
}

/**
 * 
 * @param {string} addr - берёт примерно такое "tw-0.7+udp://152.89.254.27:8310"
 * @returns {string|null} 152.89.254.27:8310 возвращает чистый адрес (если addr не валидный то null)
 */
function convertudptw(addr = 'string') {
    const match = addr.match(/(\d{1,3}(\.\d{1,3}){3}:\d+)/);
    return match[1];
}

/**
 * Делает запрос на мастер сервер ДДНета.
 * @param {Object|null} data - опционально, сырая data от getrawDDNetServers(). Если не передана, функция сама её получит.
 * @returns Сервера ДДНета если все пошло хорошо. ['ip:port']
 */
async function getDDNetServers(data = null) {
    try {
        const servers = data ? data.servers : (await getrawDDNetServers()).servers;
        if (!servers) return [];

        const ipv4WithPorts = [];

        for (const server of servers) {
            server.addresses.forEach(addr => {
                ipv4WithPorts.push(convertudptw(addr));
            });
        }
        return [...new Set(ipv4WithPorts)];
    } catch (err) {
        console.error('Ошибка:', err.message);
        return [];
    }
}

module.exports = { getDDNetServers, getrawDDNetServers, convertudptw }