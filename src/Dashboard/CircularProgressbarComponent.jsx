import React from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import lockOpen from '../Styleguide/icons/basic-lock-open.svg'


export const CircularProgressbarComponent = ({
    title,
    value,
    text,
    counterClockwise,
    months,
    pathColor,
    trailColor,
    unlock,
    donutChartId,
    customText
}) => {

    const getValue = () => {
        if(unlock) {
            return text ? `${text}%` : '0%' 
        }
        return ''
    }

    return (
        <div className='col' style={{height: "300px", alignContent: "top"}}>
            <div
                className='card'
                style={{
                    color: '#A5ACCB',
                    textAlign: 'center',
                    backgroundColor: '#1f2748',
                    borderLeftRightRadius: "4px",
                    borderTopRightRadius: "15px",
                    borderBottomLeftRadius: "15px",
                    borderBottomRightRadius: "15px",
                    height: "300px"

                }}
            >
                <br />
                <h5 className='card-title' style={{ color: 'white' }} id={donutChartId}>
                    {customText} Last {unlock ? months : 0} months
                </h5>
                <p className='card-text'>{title}</p>
                <div className='card-body'>
                    <div
                        className='d-flex justify-content-center container'
                        style={{ width: "205px", height: "100%" }}
                    >
                        <CircularProgressbar
                            value={unlock ? value : 0}
                            text={getValue()}
                            counterClockwise={counterClockwise}
                            strokeWidth={13}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                // rotation: 0.25,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                // Text size
                                textSize: '14px',
                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',
                                // Colors
                                pathColor: pathColor,
                                textColor: 'white',
                                trailColor: trailColor,
                                /*backgroundColor: '#c300dc',*/
                            })}
                        />
                    </div>
                    <br/>
                </div>
                {!unlock && <div className='chart-background'>
                    <div className="chart-background-content">
                        <img src={lockOpen} alt="lock-open" />
                        <small style={{margin: '10px 15px 0px 15px'}}>Subscribe to Study to see your statistic every day</small>
                    </div>
                </div>}
            </div>
        </div>
    )
}
