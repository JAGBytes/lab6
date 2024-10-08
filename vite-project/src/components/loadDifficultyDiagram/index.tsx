import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const colors = {
    PURPLE: '#afd1c6',
    PINK: '#15505d',
    GREEN: '#acfb03',
    ORANGE: '#3c895f',
    BLUE: '#7bd179'
};

// callTasks ahora devuelve la promesa de los datos.
async function callTasks() {
    try {
        const res = await fetch("http://localhost:80/taskManager/getTasks");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        return data; // Devuelve los datos obtenidos
    } catch (error) {
        console.error('Error fetching the tasks:', error);
        return null;
    }
}

const TaskDifficultyChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        async function loadDifficultyDiagram() {
            const data = await callTasks(); // Espera los datos de la función callTasks
            if (!data) return; // Si no hay datos, salir de la función para evitar errores.

            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                // Destruir el gráfico existente si ya existe
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                let dataValues: { [key: string]: number } = { "High": 0, "Middle": 0, "Low": 0 };

                // Recorrer los datos y contar las dificultades
                for (let i = 0; i < data.length; i++) {
                    const difficulty = data[i].difficulty;
                    if (difficulty in dataValues) {
                        dataValues[difficulty] += 1;
                    } else {
                        console.warn(`Unexpected difficulty level: ${difficulty}`);
                    }
                }

                // Crear el gráfico de barras
                const difficulties = ['High', 'Middle', 'Low'];
                chartRef.current = new Chart(ctx, {
                    type: 'bar', // Puedes cambiar a 'line' o 'pie' según tus necesidades
                    data: {
                        labels: difficulties,
                        datasets: [{
                            label: 'Number Of Tasks By Difficulty', // Etiqueta de la serie
                            data: [dataValues['High'], dataValues['Middle'], dataValues['Low']],
                            backgroundColor: [colors['PINK'], colors['BLUE'], colors['PURPLE']],
                            borderWidth: 2,
                            borderColor: '#000', // Color del borde
                            hoverBackgroundColor: [colors['PINK'], colors['BLUE'], colors['PURPLE']], // Color al pasar el mouse
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Task Distribution by Difficulty' // Título del gráfico
                            },
                            legend: {
                                display: true,
                                position: 'top', // Posición de la leyenda
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem: any) {
                                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw; // Tooltip con la etiqueta y valor
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Difficulty' // Etiqueta del eje X
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number Of Tasks' // Etiqueta del eje Y
                                },
                                beginAtZero: true // Comenzar el eje Y en 0
                            }
                        }
                    }
                });
            }
        }

        loadDifficultyDiagram();
    }, []);

    return (
        <canvas id="myCanvasTask" ref={canvasRef}></canvas>
    );
};

export default TaskDifficultyChart;
