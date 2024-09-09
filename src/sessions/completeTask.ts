import axios from 'axios';
import { neuranet } from '../../src'
import * as DateUtils from '../utils/dateUtils';

export async function completeTask(
  username: string,
  taskInfo: any,
  tasks: any,
  setTasks: any

) {


  let user = username;

  try {
    const url = `https://website2-v3xlkt54dq-uc.a.run.app/update_task/${username}/`;
    const response = await axios.post<{ result: string; username: string; }>(url, {
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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

