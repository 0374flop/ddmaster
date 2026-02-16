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