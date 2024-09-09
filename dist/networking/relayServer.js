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
exports.connect = void 0;
const net = __importStar(require("net"));
const config_1 = require("../config/config");
let senderSocket = null;
function connect() {
    const RELAY_HOST = config_1.CONFIG.relayHost; // Change this to your actual server IP
    const RELAY_PORT = config_1.CONFIG.relayPort;
    // Create a new socket and connect
    senderSocket = new net.Socket();
    senderSocket.connect(RELAY_PORT, RELAY_HOST, () => {
        console.log("Connected to the server.");
    });
    // Add error handling to log or handle errors
    senderSocket.on('error', (err) => {
        console.error("Error connecting to the relay server:", err);
    });
    senderSocket.on('close', () => {
        console.log("Socket is now closed.");
    });
    return senderSocket;
}
exports.connect = connect;
