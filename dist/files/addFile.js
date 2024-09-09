"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFile = void 0;
const axios_1 = __importDefault(require("axios"));
const src_1 = require("../../src");
async function addFile(username, fileInfo) {
    let taskInfo = {
        name: 'add file ' + fileInfo.file_name,
        device: fileInfo.original_device,
        status: 'pending',
    };
    try {
        const response = await axios_1.default.post('https://website2-v3xlkt54dq-uc.a.run.app/add_file/' + username + '/', {
            file_type: fileInfo.file_type,
            file_name: fileInfo.file_name,
            file_path: fileInfo.file_path,
            date_uploaded: fileInfo.date_uploaded,
            date_modified: fileInfo.date_modified,
            file_size: fileInfo.file_size,
            file_priority: fileInfo.file_priority,
            file_parent: fileInfo.file_parent,
            original_device: fileInfo.original_device,
            kind: fileInfo.kind,
        });
        const result = response.data.result;
        if (result === 'success') {
            console.log("File added successfully");
            let taskInfo = {
                name: 'add file ' + fileInfo.file_name,
                device: fileInfo.original_device,
                status: 'complete',
            };
            let task = await src_1.neuranet.sessions.updateTask(username, taskInfo);
            return 'success';
        }
        else if (result === 'fail') {
            let taskInfo = {
                name: 'add file ' + fileInfo.file_name,
                device: fileInfo.original_device,
                status: 'fail',
            };
            let task = await src_1.neuranet.sessions.updateTask(username, taskInfo);
            console.log("Failed to add file");
            return 'failed';
        }
        else if (result === 'device_not_found') {
            console.log("Device not found");
            return 'device not found';
        }
        else if (result === 'object_id_not_found') {
            console.log("object id not found");
            return 'device not found';
        }
        else {
            console.log("Failed to add file");
            return 'add file failed';
        }
    }
    catch (error) {
        console.error('Error adding file:', error);
        return 'error';
    }
}
exports.addFile = addFile;
