# ddmaster

Пакет для работы с ДДНет серверами.
Сделал я, 0374flop. MIT лицензия (./LICENSE)

---

## Установка

```
npm i ddmaster
```

## Импорт

```js
const ddmaster = require('ddmaster'); // CommonJS
```
```ts
import * as ddmaster from 'ddmaster'; // ESM / TypeScript
```

---

## API

**getrawDDNetServers()**
Возвращает сырую инфу с мастер сервера ДДНета. Структура ответа — `{ servers: DDNetServer[] }`.

**getDDNetServers(data?)**
Возвращает список серверов в виде `['ip:port']`.
`data` — опционально, сырая data от `getrawDDNetServers()`. Если не передана, сама получит.

**findDDNetPlayerByName(playerName, data?)**
Ищет игрока по имени (строгое сравнение через `===`) на всех серверах.
Возвращает массив серверов (та же структура что у `getrawDDNetServers`), но только те где есть этот игрок.
`data` — опционально, сырая data от `getrawDDNetServers()`.

**getinfoserver(address)**
Возвращает полную инфу об одном сервере по адресу `'ip:port'`. Или `undefined` если не найден.

**convertudptw(addr)**
Берёт адрес типа `"tw-0.6+udp://203.86.233.50:8352"` и возвращает просто `"203.86.233.50:8352"`.
Если адрес невалидный — возвращает `null`.

**filterbycommunity(servers, community)**
Фильтрует массив серверов по community (например `'ddnet'`).

**filterbylocation(servers, location)**
Фильтрует массив серверов по локации, точное совпадение (например `'eu:de'`).

**filterbylocationincludes(servers, location)**
То же самое но через includes (например `'eu'` найдёт `'eu:de'`, `'eu:pl'` и тд).

---

## Пример

```js
const ddmaster = require('ddmaster');

// список всех серверов
const servers = await ddmaster.getDDNetServers();
console.log(servers); // ['ip:port', ...]

// найти игрока
const found = await ddmaster.findDDNetPlayerByName('имя игрока');
console.log(found); // массив серверов где есть игрок

// получить только европейские сервера
const raw = await ddmaster.getrawDDNetServers();
const eu = ddmaster.filterbylocationincludes(raw.servers, 'eu');
```

---

Позже добавлю ещё функции.

(типы чтобы было понятно)
```ts
export interface DDNetServer {
    addresses: string[];
    community: string;
    location: string;
    info: ServerInfo;
}

export interface ServerInfo {
    max_clients: number;
    max_players: number;
    passworded: boolean;
    game_type: string;
    flag: number;
    name: string;
    map: ServerMap;
    version: string;
    client_score_kind: string;
    requires_login: boolean;
    clients: ServerClient[];
}

export interface ServerMap {
    name: string;
    sha256: string;
    size: number;
}

export interface ServerClient {
    name: string;
    clan: string;
    country: number;
    score: number;
    is_player: boolean;
    skin: ClientSkin;
    afk: boolean;
    team: number;
}

export interface ClientSkin {
    name: string;
    color_body?: number;
    color_feet?: number;
}
```
