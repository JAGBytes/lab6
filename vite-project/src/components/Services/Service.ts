
import axios from "axios";
import { Task } from "./TaskObject";
import { User } from "./UserObj";
const API = 'http://localhost:80/taskManager/';


export const getTasks = async (idUser :string) => {
    return axios.get<Task []>(API+'getTasksByUser?userId='+idUser);
}

export const saveNewTask = async (idUser : string, newTask: Task) => {
    return axios.post<any>(API+'saveTaskByUser?userId='+idUser, newTask);
}

/*preguntar a back que que o que*/
export const deleteTask = async (idTask: string) => {
    return axios.delete<any>(API+'delete?id='+idTask);
}

export const completeTask = async (idTask: string) => {
    return axios.patch<any>(API+'markTaskAsCompleted?id='+idTask);
}

export const randomTasks = async (idUser: string) => {
    return axios.post<any>(API+'generateTasks?idUser='+idUser);
}

export const getUser = async (id: string) => {
    return axios.get<string>(API+'getUser?idUser='+id);
}