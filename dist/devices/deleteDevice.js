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
exports.deleteDevice = void 0;
const src_1 = require("../../src");
const CredentialUtils = __importStar(require("../utils/credentialUtils"));
function deleteDevice(device_name) {
    const senderSocket = src_1.neuranet.networking.connect();
    const endOfHeader = Buffer.from('END_OF_HEADER');
    const credentials = CredentialUtils.loadCredentials();
    let username = Object.keys(credentials)[0];
    const file_size = "";
    let header = null;
    let buffer = Buffer.alloc(0);
    let null_arg = "";
    const fileHeader = `DEVICE_DELETE_REQUEST:${device_name}:${null_arg}:${username}:`;
    senderSocket.write(fileHeader);
    senderSocket.write(endOfHeader);
    let jobCompleted = false;
    senderSocket.on('data', (data) => {
        buffer = Buffer.concat([buffer, data]);
        let fileType = 'Unknown';
        if (buffer.includes(endOfHeader) && !header) {
            const endOfHeaderIndex = buffer.indexOf(endOfHeader);
            if (endOfHeaderIndex !== -1) {
                const headerPart = buffer.slice(0, endOfHeaderIndex);
                const content = buffer.slice(endOfHeaderIndex + endOfHeader.length);
                header = headerPart.toString();
                const splitHeader = header.split(':');
                fileType = splitHeader[0];
                buffer = content;
            }
        }
    });
    senderSocket.on('end', () => {
        if (!jobCompleted) {
            console.log('Connection closed before login completion.');
        }
    });
    senderSocket.on('error', (err) => {
        console.error('Error during login:', err);
        senderSocket.end();
    });
    return '';
}
exports.deleteDevice = deleteDevice;
