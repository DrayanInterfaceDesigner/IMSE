import React from 'react'
import styles from './styles/StudentGraph.module.scss'
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const StudentGraph = ({props}) => {

    const data = {
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          label: 'Sample Data',
          data: [10, 15, 30],
          backgroundColor: ['red', 'blue', 'green'],
        },
      ],
    };
    
    const options = {
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true,
        },
      },
    };
    
    return (
      <div className='StudentGraph'>
        <div className='StudentGraph__container'>
          <div className='StudentGraph__mover'>
            <div className='StudentGraph__sizer'>
              <div className='StudentGraph__innerComponent'>
                <Chart type='line' data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default StudentGraph