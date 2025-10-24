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
 * Делает запрос на мастер сервер ДДНета.
 * @returns Сервера ДДНета если все пошло хорошо. ['ip:port']
 */
async function getDDNetServers() {
  	try {
    	const response = await fetch('https://master1.ddnet.org/ddnet/15/servers.json');
    	if (!response.ok) throw new Error(`Ошибка при запросе: ${response.status}`);

    	const { servers } = await response.json();
    	const ipv4WithPorts = [];

    	for (const server of servers) {
      		server.addresses.forEach(addr => {
        		const match = addr.match(/(\d{1,3}(\.\d{1,3}){3}:\d+)/);
        		if (match) ipv4WithPorts.push(match[1]);
      		});
    	}
    	return [...new Set(ipv4WithPorts)];
  } catch (err) {
    console.error('Ошибка:', err.message);
    return [];
  }
}

module.exports = { getDDNetServers, getrawDDNetServers }