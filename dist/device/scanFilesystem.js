"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanFilesystem = void 0;
const src_1 = require("../../src");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const luxon_1 = require("luxon");
const config_1 = require("../config/config");
async function scanFilesystem(username) {
    const full_device_sync = config_1.CONFIG.full_device_sync; // Change this to your actual server IP
    const skip_dot_files = config_1.CONFIG.skip_dot_files; // Change this to your actual server IP
    // Determine the directory path based on the fullDeviceSync flag
    const directoryPath = full_device_sync ? os_1.default.homedir() : os_1.default.homedir() + "/BCloud";
    const bclouddirectoryName = "BCloud";
    const bclouddirectoryPath = os_1.default.homedir() + `/${bclouddirectoryName}`;
    // const directoryName = "BCloud";
    // const directoryPath = os.homedir() + `/${directoryName}`;
    let filesInfo = [];
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
            // Skip folders that start with a dot if skip_dot_files is true
            if (skip_dot_files && stats.isDirectory() && filename.startsWith('.')) {
                continue;
            }
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
                // await handlers.files.addFile(username, fileInfo);
                // if the length of filesInfo is more than 100, send the filesInfo to the server
                if (filesInfo.length > 1000) {
                    await src_1.neuranet.files.addFiles(username, filesInfo);
                    console.log('Sent 1000 files to the server');
                    // Clear the filesInfo array
                    filesInfo = [];
                }
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
    // After traversing all directories, send the remaining files to the server
    if (filesInfo.length > 0) {
        await src_1.neuranet.files.addFiles(username, filesInfo);
    }
    const result = 'success';
    return result;
}
exports.scanFilesystem = scanFilesystem;
