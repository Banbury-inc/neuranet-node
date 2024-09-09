/// <reference types="node" />
import * as net from 'net';
export declare function small_ping_request(username: string, senderSocket: net.Socket): Promise<void>;
export declare function ping_request(username: string, senderSocket: net.Socket): Promise<void>;
