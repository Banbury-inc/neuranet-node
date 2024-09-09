"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = void 0;
const axios_1 = __importDefault(require("axios"));
async function updateTask(username, taskInfo) {
    let user = username;
    try {
        const url = `https://website2-v3xlkt54dq-uc.a.run.app/update_task/${username}/`;
        const response = await axios_1.default.post(url, {
            user: user,
            task_name: taskInfo.name,
            task_device: taskInfo.device,
            task_status: taskInfo.status,
        });
        const result = response.data.result;
        if (result === 'success') {
            console.log("task update_success");
            return 'success';
        }
        if (result === 'fail') {
            console.log("task update failed");
            return 'failed';
        }
        if (result === 'device_already_exists') {
            console.log("device already exists");
            return 'exists';
        }
        else {
            console.log("task update failed");
            console.log(result);
            return 'device_add failed';
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
exports.updateTask = updateTask;
