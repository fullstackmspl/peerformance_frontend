import React from 'react'
import {ProgressBar} from 'react-bootstrap';
import {Bar} from "react-chartjs-2";
import {useSelector} from "react-redux";
import lockOpenImg from "../Styleguide/icons/basic-lock-open.svg"

let width = 540; // todo - look into making these fixed
let height = 178; // todo - look into making these fixed
let label;

let final_data_1;
let final_data_2;
let final_data_3;
let final_data_4;


let counter = 0;
counter = counter + 1;


export const Participant_breakdown = ({data, unlock}) => {
    let renderData = false
    let rawData = data ? data : 0;
    let locked;
    let activeBreakdown = '';
    let lockedDiv = '';
    let widthDiv = "";
    let textColour = "white";

    if (JSON.stringify(rawData).length > 100) {
        renderData = true;
    }
    let title = 'nothing'
    if (renderData === true && unlock === true) {
        widthDiv = "100%"
        if (data.breakdownResult || data.breakdownResult[0].Min !== "null" || data.breakdownResult[0].Min !== null) {

            label = label = [1, 2, 3, 4];
            const breakdown = data.result;
            let data_1 = [0, 0, 0, 0]
            let data_2 = [0, 0, 0, 0]
            let data_3 = [0, 0, 0, 0]
            let data_4 = [0, 0, 0, 0]

            for (let element = 0; element < breakdown.length; element++) {

                if (breakdown[element].Range === "Range1") {
                    if (breakdown[element].ReachID > 0) {
                        data_1[breakdown[element].ReachID - 1] = breakdown[element].Count
                        console.log("data_1", data_1)
                    }
                } else if (breakdown[element].Range === "Range2") {
                    if (breakdown[element].ReachID > 0) {
                        data_2[breakdown[element].ReachID - 1] = breakdown[element].Count;
                        console.log("data_2", data_2)
                    }
                } else if (breakdown[element].Range === "Range3") {
                    if (breakdown[element].ReachID > 0) {
                        data_3[breakdown[element].ReachID - 1] = breakdown[element].Count;
                        console.log("data_3", data_3);
                    }
                } else if (breakdown[element].Range === "Range4") {
                    if (breakdown[element].ReachID > 0) {
                        data_4[breakdown[element].ReachID - 1] = breakdown[element].Count;

                    }
                }
            }

            final_data_1 = [data_1[0], data_2[0], data_3[0], data_4[0]];

            final_data_2 = [
                data_1[0] + data_1[1],
                data_2[0] + data_2[1],
                data_3[0] + data_3[1],
                data_4[0] + data_4[1]
            ]

            final_data_3 = [
                data_1[0] + data_1[1] + data_1[2],
                data_2[0] + data_2[1] + data_2[2],
                data_3[0] + data_3[1] + data_3[2],
                data_4[0] + data_4[1] + data_4[2]
            ]

            final_data_4 = [
                data_1[0] + data_1[1] + data_1[2] + data_1[3],
                data_2[0] + data_2[1] + data_2[2] + data_2[3],
                data_3[0] + data_3[1] + data_3[2] + data_3[3],
                data_4[0] + data_4[1] + data_4[2] + data_4[3]
            ]

            activeBreakdown = <p className='card-text'> Split by quartile and participant profile </p>
            title = <h5 className='card-title' style={{color: "white"}}> Participant breakdown </h5>

        }
    } else if (renderData === false) {
        let data_1 = [0, 0, 0, 0]
        let data_2 = [0, 0, 0, 0]
        let data_3 = [0, 0, 0, 0]
        let data_4 = [0, 0, 0, 0]

        final_data_1 = [data_1[0], data_2[0], data_3[0], data_4[0]];

        final_data_2 = [
            data_1[0] + data_1[1],
            data_2[0] + data_2[1],
            data_3[0] + data_3[1],
            data_4[0] + data_4[1]
        ]

        final_data_3 = [
            data_1[0] + data_1[1] + data_1[2],
            data_2[0] + data_2[1] + data_2[2],
            data_3[0] + data_3[1] + data_3[2],
            data_4[0] + data_4[1] + data_4[2]
        ]

        final_data_4 = [
            data_1[0] + data_1[1] + data_1[2] + data_1[3],
            data_2[0] + data_2[1] + data_2[2] + data_2[3],
            data_3[0] + data_3[1] + data_3[2] + data_3[3],
            data_4[0] + data_4[1] + data_4[2] + data_4[3]
        ]

        activeBreakdown = <p className='card-text'> Split by quartile and participant profile </p>
        title = <h5 className='card-title' style={{color: "white"}}> Participant breakdown </h5>


    }  else {
        widthDiv = "90%"
        locked = <img src={lockOpenImg} alt=""/>
        title = <h5 className='card-title' style={{color: "#A5ACCB"}}> Participant breakdown </h5>
        activeBreakdown = <p className='card-text'> Split by quartile and participant profile </p>
        lockedDiv =

            <div style={{
                backgroundColor: "#1F2748CC",
                cursor: "pointer",
                height: "100%",
                width: "100",
                top: 0,
                left: 0,
            }}>
                <div>
                    <div style={{marginTop: "-26%"}} className="chart-background-content">
                        {locked}
                    </div>
                    <div style={{paddingTop: "4px"}}></div>
                    <small style={{fontSize: ".875em"}}>Subscribe to Study to see your statistic</small>
                    <div></div>
                    <small style={{fontSize: ".875em"}}>every day</small>
                </div>
            </div>

        //
        label = [0]
        final_data_1 = [0]
        final_data_2 = [0]
        final_data_3 = [0]
        final_data_4 = [0]
    }


    return (
        <div className='col-sm-6'>
            <div style={{
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "15x",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",

                width: {widthDiv},
                height: "100%"
            }}
            >
                <div
                    style={{
                        color: '#A5ACCB',
                        textAlign: 'center',
                        backgroundColor: '#1f2748', // 1f2748
                        width: "600px",
                        height: "300px",
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "15x",
                        borderBottomLeftRadius: "15px",
                        borderBottomRightRadius: "15px",
                    }}
                    id={"participant_breakdownChart"}
                >
                    <br/>
                    {title}

                    <p className='card-text'> {activeBreakdown} </p>
                    <div className='card-body'>
                        <div
                            className='d-flex justify-content-center container'>
                            <Bar
                                data={{
                                    labels: label,
                                    datasets: [
                                        {
                                            data: final_data_1,
                                            label: 'Global',
                                            // style
                                            barThickness: 17,
                                            minBarLength: 2,
                                            backgroundColor: "#38D982",
                                            borderRadius: 15,
                                            borderSkipped: false,
                                        },
                                        {
                                            data: final_data_2,
                                            // style
                                            label: 'European',

                                            barThickness: 17,
                                            minBarLength: 2,

                                            backgroundColor: "#6585FF",
                                            borderRadius: 15,
                                            borderSkipped: false,
                                        },
                                        {
                                            data: final_data_3,
                                            // style
                                            label: 'UK',

                                            barThickness: 17,
                                            minBarLength: 2,

                                            backgroundColor: "#B11DD6",
                                            borderRadius: 15,
                                            borderSkipped: false,
                                            hoverBorderColor: 'red',
                                        }, {
                                            data: final_data_4,
                                            // style
                                            label: 'Local',

                                            barThickness: 17,
                                            minBarLength: 2,

                                            backgroundColor: "#FFFFFF",
                                            borderRadius: 15,
                                            borderSkipped: false,
                                            hoverBorderColor: 'red',
                                        },
                                    ]
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: true,
                                    indexAxis: 'y', // index using the y axis

                                    // Elements options apply to all of the options unless overridden in a dataset
                                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                                    elements: {
                                        bar: {
                                            borderWidth: 1,
                                        }
                                    },
                                    responsive: true,
                                    plugins: {
                                        tooltip: {
                                            usePointStyle: true,
                                        },
                                        legend: {
                                            position: 'top',
                                            onClick: null, // Makes the legend un-clickable
                                            labels: {
                                                usePointStyle: true,
                                                boxWidth: 10,
                                            }
                                        }
                                    },
                                    scales: {
                                        y: {
                                            stacked: true, // stack using the y axis
                                            grid: {
                                                offset: true
                                            }
                                        },
                                        x: {
                                            stacked: false,
                                            grid: {
                                                offset: true,
                                                borderDash: [2, 2],
                                                color: "#5E6891",
                                            }
                                        },
                                    }
                                }}
                            />
                        </div>
                    </div>
                    {rawData && <div>
                        {lockedDiv}
                    </div>}
                </div>
            </div>
        </div>
    )
}
