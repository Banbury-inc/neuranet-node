/// <reference types="node" />
import * as net from 'net';
export declare function file_request(senderSocket: net.Socket, file_name: string, file_size: string): Promise<void>;
