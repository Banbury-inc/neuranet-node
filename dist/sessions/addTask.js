"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = void 0;
const axios_1 = __importDefault(require("axios"));
const src_1 = require("../../src");
async function addTask(username, task_description, tasks, setTasks) {
    let user = username;
    let device_name = src_1.neuranet.device.name();
    let taskInfo = {
        task_name: task_description,
        task_device: device_name,
        task_status: 'pending',
    };
    try {
        const url = `https://website2-v3xlkt54dq-uc.a.run.app/add_task/${username}/`;
        const response = await axios_1.default.post(url, {
            user: user,
            task_name: task_description,
            task_device: device_name,
            task_status: 'pending',
        });
        const result = response.data.result;
        if (result === 'success') {
            setTasks([...(tasks || []), taskInfo]);
            console.log("task add success");
            return taskInfo;
        }
        if (result === 'fail') {
            console.log("task add failed");
            return 'failed';
        }
        if (result === 'task_already_exists') {
            console.log("task already exists");
            return 'exists';
        }
        else {
            console.log("task_add failed");
            console.log(result);
            return 'task_add failed';
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
exports.addTask = addTask;
