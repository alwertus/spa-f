import React, {useRef, useState} from 'react';
import style from './CashMainChart.module.css';
import {Line} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto';

export const CashMainChart = ({data, selectDate}) => {
    const chartRef = useRef();
    const [activeDateIndex, setActiveDateIndex] = useState(0)

    const labels = data.map((item) => item.year);
    const userGainData = data.map((item) => item.userGain);
    const userLostData = data.map((item) => item.userLost);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'User Gain',
                data: userGainData,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'User Lost',
                data: userLostData,
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
            },
        ],
    }

    const onClick = (event) => {
        setActiveDateIndex(chartRef.current['scales'].x.getValueForPixel(event.x))
    }

    const options = {
        animation: true,
        elements: {
            line: {
                tension: 0.2
            }
        },
        scales: {
            x: {
                ticks: {
                    color: () => {
                        const arr = new Array(labels.length).fill('#666')
                        arr[activeDateIndex] = 'red'
                        return arr
                    }
                }
            }
        },
        onClick: onClick,
    }


    return <Line data={chartData}
                 ref={chartRef}
                 options={options}
    />;
}
