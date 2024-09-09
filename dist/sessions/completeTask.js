"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTask = void 0;
const axios_1 = __importDefault(require("axios"));
async function completeTask(username, taskInfo, tasks, setTasks) {
    let user = username;
    try {
        const url = `https://website2-v3xlkt54dq-uc.a.run.app/update_task/${username}/`;
        const response = await axios_1.default.post(url, {
            user: user,
            task_name: taskInfo.task_name,
            task_device: taskInfo.task_device,
            task_status: 'complete',
        });
        const result = response.data.result;
        if (result === 'success') {
            setTasks([...(tasks || []), taskInfo]);
            return 'success';
        }
        if (result === 'fail') {
            return 'failed';
        }
        if (result === 'device_already_exists') {
            return 'exists';
        }
        else {
            return 'else loop hit';
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
exports.completeTask = completeTask;
