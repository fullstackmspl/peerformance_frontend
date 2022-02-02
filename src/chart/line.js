import React from 'react';
import {Line} from 'react-chartjs-2';
import lockOpen from '../Styleguide/icons/basic-lock-open.svg'
import {getMonthName} from '../Utils/dashboard';

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
let height = 155;
let width = 400;

const setUpChart = (data, name) => {
    const arrayMonths = data ? data.map(row => new Date(row.Date).getMonth()) : [];
    return {
        type: 'bar',
        labels: arrayMonths ? arrayMonths.map(month => getMonthName(month)) : [],
        datasets: [
            {
                label: name,
                data: data ? data.map(row => row.Value) : [],
                borderColor: "#91FBAF",
                backgroundColor: "#91FBAF",
                pointRadius: 0
            },
            {
                label: 'Industry Average',
                data: data ? data.map(row => row.Average) : [],
                borderColor: "#6585FF",
                backgroundColor: "#6585FF",
                pointRadius: 0
            },
        ],
        options: {
            legend: {
                labels: {
                    fontColor: "blue",
                    fontSize: 18
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
}



const setUpDefaultChart = {
    type: 'bar',
    labels: ["February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November",
    ],
    datasets: [
        {
            label: 'My data',
            data: [6, 5.5, 6, 6.5, 7, 6.7, 4.2, 7, 7.5, 7, 6.5, 6],
            borderColor: "#91FBAF",
            backgroundColor: "#91FBAF",
            pointRadius: 0
        },
        {
            label: 'Industry Average',
            data: [7, 7.5, 7, 6.5, 6, 4.5, 5, 6, 5.5, 6, 6.5, 7],
            borderColor: "#6585FF",
            backgroundColor: "#6585FF",
            pointRadius: 0
        },
    ],
    options: {
        legend: {
            labels: {
                fontColor: "blue",
                fontSize: 18
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const setUpEmptyChart = {
    type: 'bar',
    labels: ["February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November",
    ],
    datasets: [
        {
            label: 'My data',
            data: [1],
            borderColor: "#91FBAF",
            backgroundColor: "#91FBAF",
            pointRadius: 0
        },
        {
            label: 'Industry Average',
            data: [2],
            borderColor: "#6585FF",
            backgroundColor: "#6585FF",
            pointRadius: 0
        },
    ],
    options: {
        legend: {
            labels: {
                fontColor: "blue",
                fontSize: 18
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const options = {
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
            labels: {
                color: 'rgb(255, 99, 132)',


            }
        }
    },
    scales: {
        y: {
            ticks: {
                beginAtZero: true,
            },
            grid: {
                borderDash: [6, 2],
                color: "#5E6891",
            }
        },
    },
    elements: {
        line: {
            tension: 0.2
        }
    }
};

export const LineChart = ({data, name,subscription}) => {
    const chartData = setUpChart(data, name);


    if (subscription === true && data && JSON.stringify(data).length > 50) {
        if (JSON.stringify(data).length > 50) {
            return (
                <Line
                    data={chartData}
                    options={options}
                    width={width}
                    height={height}
                />
            )
        }
    }

    if (subscription === true || JSON.stringify(data) === "undefined" || JSON.stringify(data) === undefined) {
        return (<Line
                data={setUpEmptyChart}
                options={options}
                width={width}
                height={height}
            />
        )
    } else {
        return (
            <div style={{
                paddingBottom: "3.5px"
            }}>
                <Line
                    data={setUpDefaultChart}
                    options={options}
                    width={width}
                    height={height}
                />
                <div className='chart-background'
                     style={{
                         borderTopRightRadius: "50px",
                         borderTopLeftRadius: "50px",
                         borderBottomLeftRadius: "50px",
                         borderBottomRightRadius: "50px",
                     }}
                >
                    <div className="chart-background-content">
                        <img src={lockOpen} alt="lock-open"/>
                        <div>
                            <small style={{fontSize: ".725em"}}>Suscribe to Study to see your statistic </small>
                            <br/>
                            <small style={{fontSize: ".725em"}}> every day</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


};
