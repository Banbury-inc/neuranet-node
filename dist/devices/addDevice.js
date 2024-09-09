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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDevice = void 0;
const axios_1 = __importDefault(require("axios"));
const src_1 = require("../../src");
const DateUtils = __importStar(require("../utils/dateUtils"));
async function addDevice(username) {
    let user = username;
    let device_number = 1;
    let device_name = src_1.neuranet.device.name();
    let storage_capacity_GB = await src_1.neuranet.device.storage_capacity();
    let max_storage_capacity_GB = 50;
    let date_added = DateUtils.get_current_date_and_time();
    let ip_address = await src_1.neuranet.device.ip_address();
    let upload_network_speed = 0;
    let download_network_speed = 0;
    let gpu_usage = await src_1.neuranet.device.gpu_usage();
    let cpu_usage = await src_1.neuranet.device.cpu_usage();
    let ram_usage = await src_1.neuranet.device.ram_usage();
    let ram_total = await src_1.neuranet.device.ram_total();
    let ram_free = await src_1.neuranet.device.ram_free();
    let device_priority = 1;
    let sync_status = false;
    let optimization_status = false;
    let online = true;
    try {
        const url = `https://website2-v3xlkt54dq-uc.a.run.app/add_device/${username}/${device_name}/`;
        const response = await axios_1.default.post(url, {
            user: user,
            device_number: device_number,
            device_name: device_name,
            storageCapacityGB: storage_capacity_GB,
            maxStorageCapacityGB: max_storage_capacity_GB,
            date_added: date_added,
            ip_address: ip_address,
            upload_network_speed: 0,
            download_network_speed: 0,
            gpu_usage: gpu_usage,
            cpu_usage: cpu_usage,
            ram_usage: ram_usage,
            ram_total: ram_total,
            ram_free: ram_free,
            device_priority: device_priority,
            sync_status: sync_status,
            optimization_status: optimization_status,
            online: online,
        });
        const result = response.data.result;
        if (result === 'success') {
            console.log("device add_success");
            return 'success';
        }
        if (result === 'fail') {
            console.log("device_add failed");
            return 'failed';
        }
        if (result === 'device_already_exists') {
            console.log("device already exists");
            return 'exists';
        }
        else {
            console.log("device_add failed");
            console.log(result);
            return 'device_add failed';
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
exports.addDevice = addDevice;
