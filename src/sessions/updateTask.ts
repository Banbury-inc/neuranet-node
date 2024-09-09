import axios from 'axios';
import { neuranet } from '../../src'
import * as DateUtils from '../utils/dateUtils';

export async function updateTask(
  username: string,
  taskInfo: any
) {


  let user = username;

  try {
    const url = `https://website2-v3xlkt54dq-uc.a.run.app/update_task/${username}/`;
    const response = await axios.post<{ result: string; username: string; }>(url, {
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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

