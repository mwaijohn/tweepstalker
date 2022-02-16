import React from 'react'
import { Bar } from "react-chartjs-2";
import { Doughnut } from 'react-chartjs-2';


function StreakBar() {
    const data = {
        datasets: [
            {
                data: [30, 40, 50],
                backgroundColor: [
                    "green",
                    "red",
                    "blue"
                ],
                borderWidth: 8,
                // borderColor: white,
                // hoverBorderColor: white
            }
        ],
        labels: ['Sales', 'Cost', 'Contribution']
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
    };
    return (
        <div style={{ maxWidth: "650px" }}>
            <Doughnut
                data={data}
                options={options}
            />
        </div>
    )
}

export default StreakBar