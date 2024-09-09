export declare function addTask(username: string, task_description: string, tasks: any, setTasks: any): Promise<"failed" | {
    task_name: string;
    task_device: string;
    task_status: string;
} | "exists" | "task_add failed" | undefined>;
