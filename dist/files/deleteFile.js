"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const src_1 = require("../../src");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function deleteFile(selectedFileNames, global_file_path, setdeleteLoading, setIsAddingFolder, setNewFolderName, setDisableFetch, username, updates, setUpdates) {
    setdeleteLoading(true);
    const deletePromises = []; // Array to hold promises for deletion operations
    selectedFileNames.forEach((fileName) => {
        const currentPath = global_file_path ?? '';
        const filePath = path_1.default.join(currentPath, fileName);
        console.log(filePath);
        // Create a promise for each file operation and push it to the array
        const deletePromise = new Promise((resolve, reject) => {
            fs_1.default.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error reading file stats: ${err}`);
                    reject(err);
                    return;
                }
                if (stats.isDirectory()) {
                    fs_1.default.rmdir(filePath, { recursive: true }, (err) => {
                        if (err) {
                            console.error(`Error deleting directory: ${err}`);
                            reject(err);
                        }
                        else {
                            console.log(`Directory '${fileName}' deleted successfully at ${filePath}`);
                            resolve();
                        }
                    });
                }
                else if (stats.isFile()) {
                    fs_1.default.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error deleting file: ${err}`);
                            reject(err);
                        }
                        else {
                            console.log(`File '${fileName}' deleted successfully at ${filePath}`);
                            resolve();
                        }
                    });
                }
            });
        });
        deletePromises.push(deletePromise);
    });
    try {
        // Wait for all delete operations to complete
        await Promise.all(deletePromises);
        console.log('All files deleted successfully.');
    }
    catch (error) {
        console.error('Error deleting files:', error);
    }
    setdeleteLoading(false);
    setIsAddingFolder(false);
    setNewFolderName("");
    setDisableFetch(false);
    // Run update devices function after all deletions are complete
    const update_result = await src_1.neuranet.devices.updateDevices(username);
    console.log(update_result);
    setUpdates(updates + 1);
}
exports.deleteFile = deleteFile;
