Короче
позже добавлю другие функции, сейчас пока что только получение сырой инфы и список серверов.
Пакет зделан чтобы проще работать с ДДНет серверами.

зделал я 0374flop

npm i ddmaster
ето скачать.

getDDNetServers() - Возвращает сервера дднет в виде [ 'ip:port' ], принимает второй параметер data. (getrawDDNetServers)
getrawDDNetServers() - Возвращает сырую инфу
convertudptw(addr) - берет что-то типа "tw-0.6+udp://203.86.233.50:8352" и возвращает просто "айпи:порт"
вот код етой штуки
"
function convertudptw(addr) {
    if (typeof addr !== 'string') return null;
    const match = addr.match(/(\d{1,3}(\.\d{1,3}){3}:\d+)/);
    loger.log('convertudptw', addr, '->', match ? match[1] : null);
    return match ? match[1] : null;
}
"
findDDNetPlayerByName(name) - штука которая возвращает примерно ту же raw дату (как у getrawDDNetServers),
но отфильтровано где есть нужный игрок. 
Так же можно передавать data как второй параметр, тоесть типа findDDNetPlayerByName(playerName, data) и data тут со структорой как у getrawDDNetServers.

Лицензия MIT (./LICENSE)

npm i ddmaster устанавливаем


const ddmaster = require('ddmaster'); рекуирим


getrawDDNetServers() пример того что выдаст (будет много серверов, но тут только один)
[
	{
        "addresses": [
            "tw-0.6+udp://203.86.233.50:8352",
            "tw-0.7+udp://203.86.233.50:8352"
        ],
        "community": "ddnet",
        "location": "as:hk",
        "info": {
            "max_clients": 63,
            "max_players": 63,
            "passworded": false,
            "game_type": "DDraceNetwork",
            "flag": 156,
            "name": "DDNet CHN1 香港 - Moderate 中阶",
            "map": {
                "name": "Weapons",
                "sha256": "8d6d0f5724dbec496d2ed88dc50c80ff09fdc6fd3d60bd2e1de6d3e666544054",
                "size": 625069
            },
            "version": "0.6.4, 19.6",
            "client_score_kind": "time",
            "requires_login": false,
            "clients": [
                {
                    "name": "Rabbit Doll",
                    "clan": "兔玩偶",
                    "country": -1,
                    "score": -9999,
                    "is_player": true,
                    "skin": {
                        "name": "rongrongtu_blue"
                    },
                    "afk": false,
                    "team": 0
                },
                {
                    "name": "Nyakori's",
                    "clan": "兔玩偶",
                    "country": -1,
                    "score": -9999,
                    "is_player": true,
                    "skin": {
                        "name": "rongrongtu_pink"
                    },
                    "afk": false,
                    "team": 0
                },
                {
                    "name": "18687017299",
                    "clan": "糖糖教",
                    "country": -1,
                    "score": -9999,
                    "is_player": true,
                    "skin": {
                        "name": "Shadow Catsk"
                    },
                    "afk": true,
                    "team": 0
                },
                {
                    "name": "pbAdq",
                    "clan": "",
                    "country": -1,
                    "score": 2167,
                    "is_player": true,
                    "skin": {
                        "name": "maotouying"
                    },
                    "afk": false,
                    "team": 0
                },
                {
                    "name": "549120418",
                    "clan": "日月教",
                    "country": 156,
                    "score": -9999,
                    "is_player": true,
                    "skin": {
                        "name": "ghostjtj",
                        "color_body": 14810880,
                        "color_feet": 16776960
                    },
                    "afk": false,
                    "team": 0
                }
            ]
        }
    }
]