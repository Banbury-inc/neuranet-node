"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiles = void 0;
const axios_1 = __importDefault(require("axios"));
async function addFiles(username, filesInfo) {
    const device = filesInfo[0].original_device;
    try {
        const response = await axios_1.default.post('https://website2-v3xlkt54dq-uc.a.run.app/add_files/' + username + '/', {
            files: filesInfo,
            device_name: device,
        });
        const result = response.data.result;
        if (result === 'success') {
            console.log("File added successfully");
            return 'success';
        }
        else if (result === 'fail') {
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
exports.addFiles = addFiles;
