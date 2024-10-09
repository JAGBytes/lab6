import axios from "axios";
import { Task } from "./TaskObject";
import {User} from "./UserObj"
const API = 'http://localhost:80/auth/';



export const RegisterNewUser = async (newUser: User) => {
    return axios.post<any>(API+'register', newUser);
}

export const LoginUser = async (user: User) => {
    const response = axios.post(API+'saveTask', user);
    console.log(response);
    return response
}
