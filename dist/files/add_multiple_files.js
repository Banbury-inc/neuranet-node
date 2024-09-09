"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_multiple_files = void 0;
const axios_1 = __importDefault(require("axios"));
async function add_multiple_files(username, filesInfo) {
    try {
        // Send the array of file objects in one request
        const response = await axios_1.default.post('https://website2-v3xlkt54dq-uc.a.run.app/add_multiple_files/' + username + '/', {
            files: filesInfo.map(fileInfo => ({
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
            })),
        });
        const result = response.data.result;
        if (result === 'success') {
            console.log("Files added successfully");
            return 'success';
        }
        else if (result === 'fail') {
            console.log("Failed to add files");
            return 'failed';
        }
        else if (result === 'device_not_found') {
            console.log("Device not found");
            return 'device not found';
        }
        else if (result === 'object_id_not_found') {
            console.log("Object ID not found");
            return 'object id not found';
        }
        else {
            console.log("Failed to add files");
            return 'add files failed';
        }
    }
    catch (error) {
        console.error('Error adding files:', error);
        return 'error';
    }
}
exports.add_multiple_files = add_multiple_files;
