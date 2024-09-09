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
exports.file_request = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
async function file_request(senderSocket, file_name, file_size) {
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
}
exports.file_request = file_request;
