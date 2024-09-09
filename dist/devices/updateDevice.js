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
exports.updateDevices = void 0;
const src_1 = require("../../src");
const DateUtils = __importStar(require("../utils/dateUtils"));
const axios_1 = __importDefault(require("axios"));
async function updateDevices(username) {
    return new Promise(async (resolve, reject) => {
        const user = username || "user";
        const device_number = 0;
        const device_name = src_1.neuranet.device.name();
        const files = await src_1.neuranet.device.directory_info(username);
        const date_added = DateUtils.get_current_date_and_time();
        const device_info_json = {
            user,
            device_number,
            device_name,
            files,
            date_added,
        };
        console.log(device_info_json);
        try {
            const response = await axios_1.default.post(`https://website2-v3xlkt54dq-uc.a.run.app/update_devices/${username}/`, device_info_json);
            if (response.status === 200) {
                if (response.data.response === 'success') {
                    console.log("Successfully updated devices");
                    const result = "success";
                    resolve(result);
                }
                else {
                    console.log("Failed to update devices");
                    console.log(response.data);
                    const result = "fail";
                    resolve(result);
                }
            }
            else if (response.status === 400) {
                console.log("Bad request");
                const result = "fail";
                resolve(result);
            }
            else if (response.status === 404) {
                console.log("error");
                const result = "fail";
                resolve(result);
            }
            else {
                console.log("error");
                const result = response.data;
                resolve(result);
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
            const result = "fail";
            resolve(result);
        }
    });
}
exports.updateDevices = updateDevices;
