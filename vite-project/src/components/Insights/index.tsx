import React, { useState } from 'react'
import style from './Insights.module.css'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
//import '../loadDifficultyDiagram/index'
import TaskDifficultyChart from '../loadDifficultyDiagram/';
import PriorityDiagram from '../loadPriorityDiagram/'
import TimeDiagram from '../loadTimeDiagram/'
import TotalTimeDiagram from '../loadTotalTimeDiagram/'

type Props = {}

export default function Insight({}: Props) {
    const [data,setData] = useState("difficultyHistogram");

    const handleGraphicChange = (e : React.ChangeEvent<HTMLSelectElement>) => {setData(e.target.value);} 

    function ChangeGraphic() {
        switch (data){
            case "difficultyHistogram":
                return <TaskDifficultyChart/>
            case "tasksCompletedOverTime":
                return <TimeDiagram/>
            case "taskAveragesByPriority":
                return <PriorityDiagram/>
            case "totalTimeSpent":
                return <TotalTimeDiagram/>
        }
    }

  return (
    <main className={style['analytics-container']}>
        <div className={style['chart-selector']}>
            <label htmlFor="chartType"><b>Select Chart:</b></label>
            <select id="chartType" value={data} onChange={handleGraphicChange}>
            <option value="difficultyHistogram">Difficulty Histogram</option>
            <option value="tasksCompletedOverTime">Tasks Completed Over Time</option>
            <option value="taskAveragesByPriority">Tasks Averages By Priority</option>
            <option value="totalTimeSpent">Total time Spent</option>
            </select>
        </div>
        <div className={style['chart-container']}>
            {ChangeGraphic()}
        </div>
    </main>
  )
}