import React from 'react';
import styles from './Task.module.css'

type Props = {
    id: string;
    name: string;
    index: number,
    description: string;
    isCompleted: boolean;
    priority: number;
    difficulty: string;
    dueDate: string;
    creationDate: string;
    estimatedTime: number;
    onCheckboxChange?: (id: string, index : number) => void;
    onDelete?: (id: string , index : number) => void;
};

export default function Load(props: Props) {
    const {
        id,
        name,
        index,
        description,
        isCompleted,
        priority,
        difficulty,
        dueDate,
        creationDate,
        estimatedTime,
        onCheckboxChange,
        onDelete
    } = props;

    const handleCheckboxChange = () => {
        onCheckboxChange?.(id,index);
    };

    const handleDelete = () => {
        onDelete?.(id,index);
    };

    const completedClass = isCompleted ? 'COMPLETED' : '';

    const priorityClass = `${1 === priority? 'first-priority': ''}
                            ${2 === priority? 'second-priority':''}
                            ${3 === priority? 'third-priority': ''}
                            ${4 === priority? 'fourth-priority': ''}
                            ${5 === priority? 'fifth-priority': ''}`;

    return (
        <div className={[styles.task, styles[completedClass]].join(' ')}>
            <input
                type="checkbox"
                className={styles['task-checkbox']}
                onChange={handleCheckboxChange}
                checked={isCompleted}
                disabled={isCompleted}
            />
            <div className={styles['task-priority']}>
                <div className={[styles.circle, styles[priorityClass]].join(' ')}><span>{priority}</span></div>
                <h2>{name}</h2>
            </div>
            <p style={{ opacity: 0.8 }}>{description}</p>
            <p style={{ opacity: 0.8 }}><i className="fas fa-calendar-alt"></i> Creation date: {creationDate}</p>
            <p style={{ opacity: 0.8 }}><i className="fas fa-calendar-check"></i> Due date: {dueDate}</p>
            <p style={{ opacity: 0.8 }}><i className="fas fa-exclamation-circle"></i> Difficulty: {difficulty}</p>
            <p style={{ opacity: 0.8 }}><i className="fas fa-clock"></i> Estimated Time: {estimatedTime.toFixed(1)} hours</p>
            <button className={styles['delete-button']} onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
        </div>
    );
}

