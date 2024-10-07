import React, { useState } from 'react'
import styles from './Task.module.css'

type Props = {}

export default function Tasks({}: Props) {
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

    function addTask(){
        console.log(taskName);
        console.log(taskDescription);
        console.log(taskDate);
        console.log(taskDifficulty);
        console.log(taskPriority);
        console.log(taskTime);
    }

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
            <button onClick={() => addTask()}>Add</button>
        </div>
        <button /*onClick={() => generateRandomTasks()}*/>Generate Random Tasks</button>
    </div>
    <div id="task-container" className={styles['task-container']}>
    </div>
</main>
)
}