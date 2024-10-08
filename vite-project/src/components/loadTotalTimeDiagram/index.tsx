import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, Colors } from 'chart.js';

const colors = {
    PURPLE: '#afd1c6',
    PINK: '#15505d',
    GREEN: '#acfb03',
    ORANGE: '#3c895f',
    BLUE: '#7bd179'
};

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

const TotalTimeDiagram: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        async function loadTotalTimeDiagram() {
            const data = await callTasks();
            if (!data) return;

            const dataValues: { [key: string]: number } = { "High": 0, "Middle": 0, "Low": 0 };

            // Recorrer los datos y contar los tiempos estimados de las tareas completadas
            for (let i = 0; i < data.length; i++) {
                if (data[i].isCompleted) {
                    dataValues[data[i].difficulty] += data[i].estimatedTime;
                }
            }

            const difficulties = ['High', 'Middle', 'Low'];

            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) return;

                // Destruir el gráfico existente si ya existe
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                // Configuración del gráfico
                const config: ChartConfiguration = {
                    type: 'pie', // Tipo de gráfico: pastel
                    data: {
                        labels: difficulties,
                        datasets: [{
                            label: 'Total Time Spent by Difficulty', // Etiqueta de la serie
                            data: [dataValues['High'], dataValues['Middle'], dataValues['Low']],
                            backgroundColor: [colors['PINK'], colors['BLUE'], colors['PURPLE']], // Colores del gráfico
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Total Time Spent by Difficulty' // Título del gráfico
                            },
                            legend: {
                                display: true,
                                position: 'top', // Posición de la leyenda
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem: any) {
                                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' hours';
                                    }
                                }
                            }
                        }
                    }
                };

                chartRef.current = new Chart(ctx, config);
            }
        }

        loadTotalTimeDiagram();
    }, []);

    return (
        <canvas id="myFullTimeTask" ref={canvasRef}></canvas>
    );
};

export default TotalTimeDiagram;