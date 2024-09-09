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
exports.ping_request = exports.small_ping_request = void 0;
const src_1 = require("../../src");
const DateUtils = __importStar(require("../utils/dateUtils"));
async function small_ping_request(username, senderSocket) {
    console.log("received small ping request");
    // Handle ping request
    let user = username;
    // let user = Object.keys(credentials)[0];
    let device_number = 0;
    let device_name = src_1.neuranet.device.name();
    let files = await src_1.neuranet.device.directory_info(username);
    let date_added = DateUtils.get_current_date_and_time();
    const device_info_json = {
        user,
        device_number,
        device_name,
        files,
        date_added,
    };
    await src_1.neuranet.networking.send_small_device_info(senderSocket, device_info_json);
    console.log("completed small ping request");
}
exports.small_ping_request = small_ping_request;
async function ping_request(username, senderSocket) {
    console.log("Received a ping request");
    let user = username;
    let device_number = 1;
    let device_name = src_1.neuranet.device.name();
    let storage_capacity_GB = await src_1.neuranet.device.storage_capacity();
    let max_storage_capacity_GB = 50;
    let date_added = DateUtils.get_current_date_and_time();
    let ip_address = await src_1.neuranet.device.ip_address();
    let average_network_speed = 0;
    let upload_network_speed = 0;
    let download_network_speed = 0;
    let gpu_usage = await src_1.neuranet.device.gpu_usage();
    let cpu_usage = await src_1.neuranet.device.cpu_usage();
    let ram_usage = await src_1.neuranet.device.ram_usage();
    let ram_total = await src_1.neuranet.device.ram_total();
    let ram_free = await src_1.neuranet.device.ram_free();
    let predicted_upload_network_speed = 0;
    let predicted_download_network_speed = 0;
    let predicted_gpu_usage = 0;
    let predicted_cpu_usage = 0;
    let predicted_ram_usage = 0;
    let predicted_performance_score = 0;
    let network_reliability = 0;
    let average_time_online = 0;
    let tasks = 0;
    let device_priority = 1;
    let sync_status = true;
    let optimization_status = true;
    let online = true;
    const device_info_json = {
        user,
        device_number,
        device_name,
        storage_capacity_GB,
        max_storage_capacity_GB,
        date_added,
        ip_address,
        average_network_speed,
        upload_network_speed,
        download_network_speed,
        gpu_usage,
        cpu_usage,
        ram_usage,
        ram_total,
        ram_free,
        predicted_upload_network_speed,
        predicted_download_network_speed,
        predicted_gpu_usage,
        predicted_cpu_usage,
        predicted_ram_usage,
        predicted_performance_score,
        network_reliability,
        average_time_online,
        tasks,
        device_priority,
        sync_status,
        optimization_status,
        online
    };
    await src_1.neuranet.networking.send_device_info(senderSocket, device_info_json);
    console.log("completed ping request");
}
exports.ping_request = ping_request;
