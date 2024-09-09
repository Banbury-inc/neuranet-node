/// <reference types="node" />
import * as net from "net";
interface DeviceInfo {
    user: string;
    device_number: number;
    device_name: string;
    storage_capacity_GB: number;
    max_storage_capacity_GB: number;
    date_added: string;
    ip_address: string;
    average_network_speed: number;
    upload_network_speed: number;
    download_network_speed: number;
    gpu_usage: number;
    cpu_usage: number;
    ram_usage: number;
    ram_total: number;
    ram_free: number;
    predicted_upload_network_speed: number;
    predicted_download_network_speed: number;
    predicted_gpu_usage: number;
    predicted_cpu_usage: number;
    predicted_ram_usage: number;
    predicted_performance_score: number;
    network_reliability: number;
    average_time_online: number;
    tasks: number;
    device_priority: number;
    sync_status: boolean;
    optimization_status: boolean;
    online: boolean;
}
interface SmallDeviceInfo {
    user: string;
    device_number: number;
    device_name: string;
    date_added: string;
}
export declare function send_small_device_info(sender_socket: net.Socket, device_info: SmallDeviceInfo): Promise<void>;
export declare function send_device_info(sender_socket: net.Socket, device_info: DeviceInfo): Promise<void>;
export {};
