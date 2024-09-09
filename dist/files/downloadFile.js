"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
const net = __importStar(require("net"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const config_1 = require("../config/config");
function downloadFile(files, devices) {
    return new Promise((resolve, reject) => {
        const RELAY_HOST = config_1.CONFIG.relayHost; // Change this to your actual server IP
        const RELAY_PORT = config_1.CONFIG.relayPort;
        const senderSocket = new net.Socket();
        senderSocket.connect(RELAY_PORT, RELAY_HOST, () => {
            const null_arg = '';
            const file_header = `FILE_REQUEST:${files}:7679671:mmills6060:END_OF_HEADER`;
            senderSocket.write(file_header);
            // senderSocket.write("END_OF_HEADER");
        });
        const endOfHeader = Buffer.from('END_OF_HEADER');
        let buffer = Buffer.alloc(0);
        senderSocket.on('data', (data) => {
            buffer = Buffer.concat([buffer, data]);
            if (buffer.includes(endOfHeader)) {
                const endOfHeaderIndex = buffer.indexOf(endOfHeader);
                if (endOfHeaderIndex !== -1) {
                    const headerPart = buffer.slice(0, endOfHeaderIndex);
                    const content = buffer.slice(endOfHeaderIndex + endOfHeader.length);
                    buffer = content; // Update buffer to remove processed header
                    const header = headerPart.toString();
                    const splitHeader = header.split(':');
                    const fileType = splitHeader[0];
                    const file_name = splitHeader[1];
                    const file_size = splitHeader[2];
                    if (fileType === 'FILE_REQUEST') {
                        console.log(`Device is requesting file: ${file_name}`);
                        const directory_name = "BCloud";
                        const directory_path = path.join(os.homedir(), directory_name);
                        const file_save_path = path.join(directory_path, file_name);
                        let request_file_name = path.basename(file_save_path);
                        try {
                            // Attempt to open the file
                            const file = fs.createReadStream(file_save_path);
                            const null_string = "";
                            const file_header = `FILE_REQUEST_RESPONSE:${request_file_name}:${file_size}:${null_string}:END_OF_HEADER`;
                            senderSocket.write(file_header);
                            let total_bytes_sent = 0;
                            file.on('data', (bytes_read) => {
                                console.log("sending file...");
                                senderSocket.write(bytes_read);
                                total_bytes_sent += bytes_read.length;
                            });
                            file.on('end', () => {
                                console.log(`${file_name} has been sent successfully.`);
                                senderSocket.end();
                            });
                            file.on('error', (err) => {
                                console.error(`Error reading file: ${err}`);
                                senderSocket.end();
                            });
                        }
                        catch (error) {
                            console.error(`Error sending file response: ${error}`);
                            senderSocket.end();
                        }
                        resolve('received file request ;)');
                    }
                    if (fileType === 'REGISTRATION_FAILURE_USER_ALREADY_EXISTS') {
                        resolve('exists');
                    }
                    else {
                        resolve(fileType);
                    }
                }
            }
        });
        senderSocket.on('end', () => {
            console.log('Disconnected from server');
            reject(new Error('Connection ended without confirmation'));
        });
        senderSocket.on('error', (err) => {
            console.error('Socket error:', err);
            reject(err);
        });
        senderSocket.on('close', hadError => {
            if (!hadError) {
                reject(new Error('Connection closed unexpectedly'));
            }
        });
    });
}
exports.downloadFile = downloadFile;
