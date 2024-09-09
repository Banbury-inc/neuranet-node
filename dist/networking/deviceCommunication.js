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
exports.send_device_info = exports.send_small_device_info = void 0;
const DateUtils = __importStar(require("../utils/dateUtils"));
async function send_small_device_info(sender_socket, device_info) {
    const date_time = DateUtils.get_current_date_and_time();
    const null_string = "";
    const file_header = "SMALL_PING_REQUEST_RESPONSE::::END_OF_HEADER";
    const device_info_with_stop_signal = JSON.stringify(device_info) + "END_OF_JSON";
    let full_message = file_header + device_info_with_stop_signal;
    sender_socket.write(full_message);
}
exports.send_small_device_info = send_small_device_info;
async function send_device_info(sender_socket, device_info) {
    const date_time = DateUtils.get_current_date_and_time();
    const null_string = "";
    const file_header = `PING_REQUEST_RESPONSE:${null_string}:${null_string}:${null_string}:END_OF_HEADER`;
    const device_info_with_stop_signal = JSON.stringify(device_info) + "END_OF_JSON";
    let full_message = file_header + device_info_with_stop_signal;
    sender_socket.write(full_message);
    console.log(full_message);
    console.log("ping request response sent to server");
}
exports.send_device_info = send_device_info;
