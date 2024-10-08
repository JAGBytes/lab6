import React, { useState } from 'react'
import styles from './Task.module.css'
import axios from "axios";

import Load from './Load'
type Task = {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    priority: number;
    difficulty: string;
    dueDate: string;
    creationDate: string;
    estimatedTime: number;
    onCheckboxChange?: (id: string) => void;
    onDelete?: (id: string) => void;
};

type Props = {};

const baseURL = "http://localhost:80/taskManager/getTasks";

export default function Tasks({}: Props) {

    const[index,setIndex] = useState(0);

    const handleIndex = () =>{
        setIndex(index+1);
        return index;
    }

    const [post, setPost] = useState<Task[]>([]);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskDifficulty, setTaskDifficulty] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskTime, setTaskTime] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskDescription(e.target.value);
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDate(e.target.value);
    }
    const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDifficulty(e.target.id);
    }
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskPriority(e.target.value);
    }
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTime(e.target.value);
    }

    React.useEffect(() => {
        axios.get('http://localhost:80/taskManager/getTasks') // Reemplaza con tu URL real
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
            console.log(post)
    }, []);

    const addTask = async () => {
        try {
            const response = await axios.post("http://localhost:80/taskManager/saveTask", {                
                name: taskName,
                description: taskDescription,
                dueDate: taskDate,
                difficulty: taskDifficulty,
                priority: taskPriority,
                estimatedTime: taskTime
            });

            setPost([...post, response.data]);

            // Limpiar campos después de agregar
            setTaskName('');
            setTaskDescription('');
            setTaskDate('');
            setTaskDifficulty('');
            setTaskPriority('');
            setTaskTime('');
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    const handleAddTaskClick = async () => {
        await addTask();
        console.log(post)
    };
    const deleteTask = async (taskId: string, index: number) => {
        try {
            // Interpolación de cadenas usando backticks
            await axios.delete(`http://localhost:80/taskManager/delete?id=${taskId}`);
    
            
            setPost(post.splice(index,1));
            console.log(index);
        } catch (error) {
            console.error('Error deleting task:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
    };


  return (
    <main className={styles['main-container']}>
    <div className={styles['task-form']}>
        <div className={styles['form-group']}>
            <label htmlFor="taskTitle"><b>Title</b></label>
            <input 
                type="text" 
                id="taskTitle" 
                placeholder="Enter a title (no more than 30 characters)" 
                maxLength={30} 
                value={taskName}
                onChange={handleNameChange}
            />
        </div>
        <div className={styles['form-group']}>
            <label htmlFor="taskDescription"><b>Description</b></label>
            <textarea 
                id="taskDescription" 
                placeholder="Enter a description (no more than 50 characters)" 
                maxLength={50} 
                value={taskDescription}
                onChange={handleDescriptionChange}
            ></textarea>
        </div>
        <div className={styles['form-group']} id={styles['radio-b']}>
            <label><b>Difficulty</b></label>
            <div className={styles['form-group']}>
                <span className={styles['opcion-radio']}>
                    <input type="radio" id="high" name="taskDifficulty"  
                    value="high"
                    checked={ taskDifficulty === 'high' }
                    onChange={handleDifficultyChange}/>
                    <label htmlFor="high">High</label>
                </span>

                <span className={styles['opcion-radio']}>
                    <input type="radio" id="middle" name="taskDifficulty" 
                   value="middle"
                   checked={ taskDifficulty === 'middle' }
                   onChange={handleDifficultyChange}/>
                    <label htmlFor="middle">Middle</label>
                </span>

                <span className={styles['opcion-radio']}>
                    <input type="radio" id="low" name="taskDifficulty" 
                    value="low"
                    checked={ taskDifficulty === 'low' }
                    onChange={handleDifficultyChange} />
                    <label htmlFor="low">Low</label>
                </span>
            </div>
        </div>

        <div className={styles['form-group']}>
            <label htmlFor="taskPriority"><b>Priority</b></label>
            <select id="taskPriority" className={styles['taskPriority']} value={taskPriority} onChange={handlePriorityChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div className={styles['form-group']}>
            <label htmlFor="averageTime"><b>Average Time</b></label>
            <input 
                type="number" 
                id="averageTime" 
                placeholder="Enter average time" 
                step="0.1" 
                min="0" 
                value={taskTime}
                onChange={handleTimeChange}
            />
        </div>
        <div className={styles['date-container']}>
            <div className={styles['date-input']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <input type="date" id="taskDueDate" 
                value={taskDate}
                onChange={handleDateChange}/>
            </div>
            <button onClick={() => handleAddTaskClick()}>Add</button>
        </div>
        <button /*onClick={() => generateRandomTasks()}*/>Generate Random Tasks</button>
    </div>
    <div id="task-container" className={styles['task-container']}>
        {post.map((task) => <Load
        
        key={task.id}
        id={task.id}
        index={handleIndex()}
        name={task.name}
        description={task.description}
        isCompleted={task.isCompleted}
        priority={task.priority}
        difficulty={task.difficulty}
        dueDate={task.dueDate}
        creationDate={task.creationDate}
        estimatedTime={task.estimatedTime}
        onDelete={deleteTask}
        ></Load> )}
    </div>
</main>
)
}
