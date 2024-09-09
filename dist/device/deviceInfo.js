"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directory_info = exports.ip_address = exports.ram_free = exports.ram_total = exports.ram_usage = exports.gpu_usage = exports.cpu_usage = exports.cpu_info = exports.storage_capacity = exports.name = void 0;
const src_1 = require("../../src");
const systeminformation_1 = __importDefault(require("../../dependency/systeminformation"));
const axios_1 = __importDefault(require("axios"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const luxon_1 = require("luxon");
const config_1 = require("../config/config");
function name() {
    return os_1.default.hostname();
}
exports.name = name;
async function storage_capacity() {
    try {
        const diskData = await systeminformation_1.default.fsSize();
        const totalCapacityBytes = diskData.reduce((total, disk) => total + disk.size, 0);
        const totalCapacityGB = totalCapacityBytes / (1024 * 1024 * 1024); // Convert bytes to GB
        return totalCapacityGB;
    }
    catch (error) {
        console.error('Error retrieving storage capacity:', error);
        throw error; // Rethrow error to handle externally
    }
}
exports.storage_capacity = storage_capacity;
async function cpu_info() {
    try {
        const cpuData = await systeminformation_1.default.cpu();
        const cpuPerformance = {
            manufacturer: cpuData.manufacturer || 'Unknown',
            brand: cpuData.brand || 'Unknown',
            speed: cpuData.speed || 0,
            cores: cpuData.cores || 0,
            physicalCores: cpuData.physicalCores || 0,
            processors: cpuData.processors || 0
        };
        return cpuPerformance;
    }
    catch (error) {
        console.error('Error retrieving CPU performance:', error);
        throw error; // Rethrow error to handle externally
    }
}
exports.cpu_info = cpu_info;
async function cpu_usage() {
    try {
        const cpuData = await systeminformation_1.default.currentLoad();
        const cpuUsage = cpuData.currentLoad || 0;
        return cpuUsage;
    }
    catch (error) {
        console.error('Error retrieving CPU usage:', error);
        throw error; // Rethrow error to handle externally
    }
}
exports.cpu_usage = cpu_usage;
async function gpu_usage() {
    try {
        const gpuData = await systeminformation_1.default.graphics();
        const totalUtilization = gpuData.controllers.reduce((total, controller) => total + (controller.utilizationGpu || 0), 0);
        return totalUtilization / gpuData.controllers.length;
    }
    catch (error) {
        console.error('Error retrieving GPU utilization:', error);
        throw error; // Rethrow error to handle externally
    }
}
exports.gpu_usage = gpu_usage;
async function ram_usage() {
    try {
        const memData = await systeminformation_1.default.mem();
        const totalMemory = memData.total || 0;
        const usedMemory = memData.used || 0;
        const freeMemory = memData.free || 0;
        const usagePercentage = (usedMemory / totalMemory) * 100;
        const ramUsage = {
            total: totalMemory,
            free: freeMemory,
            used: usedMemory,
            usagePercentage: isNaN(usagePercentage) ? 0 : usagePercentage // Handle NaN case
        };
        return isNaN(usagePercentage) ? 0 : usagePercentage; // Handle NaN case
    }
    catch (error) {
        console.error('Error retrieving RAM usage:', error);
        throw error; // Rethrow error to handle externally
    }
}
exports.ram_usage = ram_usage;
async function ram_total() {
    try {
        const memData = await systeminformation_1.default.mem();
        const totalMemory = memData.total || 0;
        const usedMemory = memData.used || 0;
        const freeMemory = memData.free || 0;
        const usagePercentage = (usedMemory / totalMemory) * 100;
        const ramUsage = {
            total: totalMemory,
            free: freeMemory,
            used: usedMemory,
            usagePercentage: isNaN(usagePercentage) ? 0 : usagePercentage // Handle NaN case
        };
        return isNaN(totalMemory) ? 0 : totalMemory; // Handle NaN case
    }
    catch (error) {
        console.error('Error retrieving RAM usage:', error);
        throw error; // Rethrow error to handle externally
    }
}
exports.ram_total = ram_total;
async function ram_free() {
    try {
        const memData = await systeminformation_1.default.mem();
        const totalMemory = memData.total || 0;
        const usedMemory = memData.used || 0;
        const freeMemory = memData.free || 0;
        const usagePercentage = (usedMemory / totalMemory) * 100;
        const ramUsage = {
            total: totalMemory,
            free: freeMemory,
            used: usedMemory,
            usagePercentage: isNaN(usagePercentage) ? 0 : usagePercentage // Handle NaN case
        };
        return isNaN(freeMemory) ? 0 : freeMemory; // Handle NaN case
    }
    catch (error) {
        console.error('Error retrieving RAM usage:', error);
        throw error; // Rethrow error to handle externally
    }
}
exports.ram_free = ram_free;
async function ip_address() {
    let ip_address = null;
    try {
        const response = await axios_1.default.get('https://httpbin.org/ip');
        const ip_info = response.data;
        const origin = ip_info.origin || 'Unknown';
        ip_address = origin.split(',')[0];
    }
    catch (error) {
        console.error('Error occurred:', error);
        ip_address = 'Unknown';
    }
    return ip_address || 'Unknown';
}
exports.ip_address = ip_address;
async function countFilesAndFolders(directoryPath) {
    let totalCount = 0;
    const startTime = Date.now();
    // Set up an interval to log the count every 3 seconds
    const intervalId = setInterval(() => {
        console.log(`Total number of files and folders: ${totalCount}`);
    }, 3);
    async function traverseAndCount(currentPath) {
        const files = fs_1.default.readdirSync(currentPath);
        for (const filename of files) {
            try {
                const filePath = path_1.default.join(currentPath, filename);
                const stats = fs_1.default.statSync(filePath);
                totalCount++; // Count the current file or directory
                if (stats.isDirectory()) {
                    await traverseAndCount(filePath); // Recurse into the directory
                }
            }
            catch (error) {
                console.error('Error reading file:', error);
                // Skip to the next file
                continue;
            }
        }
    }
    await traverseAndCount(directoryPath);
    // Clear the interval once done
    clearInterval(intervalId);
    // Log the final count
    console.log(`Final total number of files and folders: ${totalCount}`);
    return totalCount;
}
async function directory_info(username) {
    const full_device_sync = config_1.CONFIG.full_device_sync; // Change this to your actual server IP
    // Determine the directory path based on the fullDeviceSync flag
    const directoryPath = full_device_sync ? os_1.default.homedir() : os_1.default.homedir() + "/BCloud";
    const bclouddirectoryName = "BCloud";
    const bclouddirectoryPath = os_1.default.homedir() + `/${bclouddirectoryName}`;
    // const directoryName = "BCloud";
    // const directoryPath = os.homedir() + `/${directoryName}`;
    const filesInfo = [];
    // Check if the directory exists, create if it does not and create a welcome text file
    if (!fs_1.default.existsSync(bclouddirectoryPath)) {
        fs_1.default.mkdirSync(bclouddirectoryPath, { recursive: true });
        const welcomeFilePath = path_1.default.join(bclouddirectoryPath, "welcome.txt");
        fs_1.default.writeFileSync(welcomeFilePath, "Welcome to Banbury Cloud! This is the directory that will contain all of the files " +
            "that you would like to have in the cloud and streamed throughout all of your devices. " +
            "You may place as many files in here as you would like, and they will appear on all of " +
            "your other devices.");
    }
    function getFileKind(filename) {
        const ext = path_1.default.extname(filename).toLowerCase();
        const fileTypes = {
            '.png': 'Image',
            '.jpg': 'Image',
            '.JPG': 'Image',
            '.jpeg': 'Image',
            '.gi': 'Image',
            '.bmp': 'Image',
            '.svg': 'Image',
            '.mp4': 'Video',
            '.mov': 'Video',
            '.webm': 'Video',
            '.avi': 'Video',
            '.mkv': 'Video',
            '.wmv': 'Video',
            '.flv': 'Video',
            '.mp3': 'Audio',
            '.wav': 'Audio',
            '.aac': 'Audio',
            '.flac': 'Audio',
            '.ogg': 'Audio',
            '.wma': 'Audio',
            '.pdf': 'Document',
            '.doc': 'Document',
            '.docx': 'Document',
            '.xls': 'Document',
            '.xlsx': 'Document',
            '.ppt': 'Document',
            '.pptx': 'Document',
            '.txt': 'Text',
            '.csv': 'Data',
            '.json': 'Data',
            '.xml': 'Data',
            '.zip': 'Archive',
            '.rar': 'Archive',
            '.7z': 'Archive',
            '.tar': 'Archive',
            '.gz': 'Archive',
            '.exe': 'Executable',
            '.dll': 'Executable',
            '.sh': 'Script',
            '.cpp': 'Script',
            '.ts': 'Script',
            '.bat': 'Script',
            '.rs': 'Script',
            '.py': 'Script',
            '.js': 'Script',
            '.html': 'Web',
            '.css': 'Web',
            // Add more file extensions as needed
        };
        return fileTypes[ext] || 'unknown';
    }
    // Recursive function to get file info
    async function traverseDirectory(currentPath) {
        const files = fs_1.default.readdirSync(currentPath);
        for (const filename of files) {
            const filePath = path_1.default.join(currentPath, filename);
            const stats = fs_1.default.statSync(filePath);
            try {
                // Determine if it is a file or directory and push appropriate info to filesInfo
                const fileInfo = {
                    "file_type": stats.isDirectory() ? "directory" : "file",
                    "file_name": filename,
                    "file_path": filePath,
                    "date_uploaded": luxon_1.DateTime.fromMillis(stats.birthtimeMs).toFormat('yyyy-MM-dd HH:mm:ss'),
                    "date_modified": luxon_1.DateTime.fromMillis(stats.mtimeMs).toFormat('yyyy-MM-dd HH:mm:ss'),
                    "file_size": stats.isDirectory() ? 0 : stats.size,
                    "file_priority": 1,
                    "file_parent": path_1.default.dirname(filePath),
                    "original_device": os_1.default.hostname(),
                    "kind": stats.isDirectory() ? 'Folder' : getFileKind(filename),
                };
                console.log(filename);
                await src_1.neuranet.files.addFile(username, fileInfo);
                // If it's a directory, recurse into it
                if (stats.isDirectory()) {
                    await traverseDirectory(filePath);
                }
                filesInfo.push(fileInfo);
            }
            catch (error) {
                console.error('Error reading file:', error);
                // Skip to the next file
                continue;
            }
        }
    }
    // Start processing the files and directories
    await traverseDirectory(directoryPath);
    console.log(`Total files and directories processed: ${filesInfo.length}`);
    return filesInfo;
}
exports.directory_info = directory_info;
