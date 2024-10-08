import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Función para llamar a la API y obtener las tareas
async function callTasks() {
    try {
        const res = await fetch("http://localhost:80/taskManager/getTasks");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data; // Devuelve los datos obtenidos
    } catch (error) {
        console.error('Error fetching the tasks:', error);
        return null;
    }
}

const TimeDiagram: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        async function loadTimeDiagram() {
            const data = await callTasks();
            if (!data) return;

            let timeSum: { [key: string]: number } = {};

            for (let i = 0; i < data.length; i++) {
                let taskTime = data[i].estimatedTime;

                if (data[i].isCompleted) {
                    if (timeSum[taskTime]) {
                        timeSum[taskTime.toFixed(1)] += 1;
                    } else {
                        timeSum[taskTime.toFixed(1)] = taskTime;
                    }
                }
            }

            let times = Object.keys(timeSum);
            let avgTimes = times.map(t => timeSum[t]);

            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                // Destruir el gráfico existente si ya existe
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Configuración del gráfico
                chartRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: times,  // Etiquetas (tiempos)
                        datasets: [{
                            label: 'Average Time',
                            data: avgTimes,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Time (Hours)'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number Of Tasks Completed'
                                }
                            }
                        }
                    }
                });
            }
        }

        loadTimeDiagram();
    }, []);

    return (
        <canvas id="myCanvasTime" ref={canvasRef}></canvas>
        
    );
};

export default TimeDiagram;