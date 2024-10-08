
import axios from "axios";
import { Task } from "./TaskObject";
const API = 'http://localhost:80/taskManager/';


export const getTasks = async () => {
    return axios.get<Task []>(API+'getTasks');
}

export const saveNewTask = async (newTask: Task) => {
    return axios.post<any>(API+'saveTask', newTask);
}

export const deleteTask = async (idTask: string) => {
    return axios.delete<any>(API+'delete?id='+idTask);
}

export const completeTask = async (idTask: string) => {
    return axios.patch<any>(API+'markTaskAsCompleted?id='+idTask);
}

export const randomTasks = async () => {
    return axios.get<any>(API+'generateTasks');
}