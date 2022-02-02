import React, {useState} from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Doughnut} from 'react-chartjs-2';
import {LineChart, LockedLineChart} from '../src/chart/line';
import AddDataPopUp from "./AddDataPopup";
import hierarchy from "./Styleguide/hierarchy.svg"
import mapPin from "./Styleguide/map-pin.svg"
import fakeImage3 from "./Styleguide/fake_dashboard_3.svg"
import users from "./Styleguide/users.svg";
import {getRegionDescription, checkSubscription} from './Utils/dashboard';
import {useSelector, useDispatch} from 'react-redux';
import SubscribeToStudy from './Dashboard/SubscribeToStudy';
import {getParticipantBreakdown, subscribeStudy} from './store/dashboardActions';
import ProgressBarComponent from './Dashboard/components/ProgressBarComponent';
import {Participant_breakdown} from './Dashboard/Participant_breakdown';
import {CircularProgressbarComponent} from './Dashboard/CircularProgressbarComponent';
import {getMonthName} from './Utils/dashboard';
import BrowseCategory from "./BrowseCategory";
import Regions from "./Regions";


function MainCard() {
    const activeStudy = useSelector(state => state.dashboard.activeStudy);
    const userSubscriptions = useSelector(state => state.dashboard.userSubscriptions);
    const user = useSelector(state => state.dashboard.userInfo);

    const studyData = useSelector(state => state.dashboard.studyData);
    const participantData = useSelector(state => state.dashboard.participantBreakDown);

    const isSubscriber = checkSubscription(activeStudy, userSubscriptions);

    const [modalShow, setModalShow] = React.useState(false);
    const regions = useSelector(state => state.dashboard.regions);
    const [regionModalShow, setRegionModalShow] = React.useState(false);

    let getPeerGroup4or5State = sessionStorage.getItem("fetchedLevel4");
    let getPeerGroup6State = sessionStorage.getItem("fetchedLevel6");
    let getRegionName = sessionStorage.getItem("regionName");

    const dispatch = useDispatch();
    const onSubscribeStudy = () => {
        dispatch(subscribeStudy(activeStudy.ID));
        // dispatch(getParticipantBreakdown(activeStudy.ID));
    };

    const getChartTypeTitle = typeId => {
        switch (typeId) {
            case 1:
                return 'Monthly Percentage Change';
            case 2:
                return 'Monthly Producer Average';
            case 3:
                return 'Absolute Monthly Change';
            default:
                return null;
        }
    }

    const getSum = (total, num) => {
        return total + (num.Value / 100) * total;
    }

    const getSumAverage = (total, num) => {
        return total + (num.Average / 100) * total;
    }

    const countCircleResult = () => {

        if (activeStudy?.TypeID === 3 || activeStudy?.TypeID === 2) {
            const firstValue = studyData && studyData.length ? studyData[0]?.Value : 0;
            const mostRecentValue = studyData && studyData.length ? studyData[studyData.length - 1]?.Value : 0;
            if (firstValue && mostRecentValue) {
                let calculateValue = (((mostRecentValue / firstValue) * 100) - 100);
                return parseFloat(calculateValue?.toFixed(2));
            }
            return 0;
        } else if (activeStudy?.TypeID === 1) {
            let sum = studyData?.reduce(getSum, 100);
            let toString = JSON.stringify(studyData);

            if (toString === "undefined" || toString === undefined || studyData.length === 0) {
                sum = 0;
            }
            return parseFloat(sum?.toFixed(2));
        }

        if (activeStudy?.TypeID === 1 && studyData.length === 0) {
            return 0;
        }
        return 0;
    }

    const countCircleAverageResult = () => {
        if (activeStudy?.TypeID === 3 || activeStudy?.TypeID === 2) {
            const firstValue = studyData && studyData.length ? studyData[0]?.Average : 0;
            const mostRecentValue = studyData && studyData.length ? studyData[studyData.length - 1]?.Average : 0;
            if (firstValue && mostRecentValue) {
                let calculateValue = (((mostRecentValue / firstValue) * 100) - 100);
                return parseFloat(calculateValue?.toFixed(2));
            }
            return 0;
        } else if (activeStudy?.TypeID === 1) {
            let sum = studyData?.reduce(getSumAverage, 100);

            let toString = JSON.stringify(studyData);

            if (toString === "undefined" || toString === undefined || studyData.length === 0) {
                sum = 0;
            }

            return parseFloat(sum?.toFixed(2));
        }
        return 0;
    }

    const getCircularProgressBarAverageValue = () => {
        if (circleResult > 100 || circleAverageResult > 100) {
            if (circleResult > circleAverageResult) {
                return (circleAverageResult / circleResult) * 100;
            } else {
                return 100;
            }
        }

        return Math.abs(circleAverageResult)
    }

    const getCircularProgressBarValue = () => {

        if (circleResult > 100 || circleAverageResult > 100) {
            if (circleResult > circleAverageResult) {
                return 100;
            } else {
                return (circleResult / circleAverageResult) * 100;
            }
        }
        return Math.abs(circleResult)
    }

    const getUserLastMonthValue = () => {
        const typeId = activeStudy.TypeID;
        const lastStudyDataResult = studyData && studyData[studyData?.length - 1];
        const value = lastStudyDataResult?.Value || 0;
        const average = lastStudyDataResult?.Average || 0;

        if (value && average) {
            if (typeId === 1) {
                const absoluteValue = Math.abs(value);
                const absoluteAverage = Math.abs(average);
                if (absoluteValue > 100 || absoluteAverage > 100) {
                    const scale = Math.max(absoluteValue, absoluteAverage);
                    return (value / scale) * 100;
                } else {
                    return value;
                }

            } else {
                const scale = Math.max(value, average);
                return (value / scale) * 100;
            }
        } else {
            return 0;
        }
    }

    const getAverageLastMonthValue = () => {
        const typeId = activeStudy.TypeID;
        const lastStudyDataResult = studyData && studyData[studyData?.length - 1];
        const value = lastStudyDataResult?.Value || 0;
        const average = lastStudyDataResult?.Average || 0;

        if (value && average) {
            if (typeId === 1) {
                const absoluteValue = Math.abs(value);
                const absoluteAverage = Math.abs(average);
                if (absoluteValue > 100 || absoluteAverage > 100) {
                    const scale = Math.max(absoluteValue, absoluteAverage);
                    return (average / scale) * 100;
                } else {
                    return average;
                }
            } else {
                const scale = Math.max(value, average);
                return (average / scale) * 100;
            }
        } else {
            return 0;
        }
    }

    const circleAverageResult = Math.round(countCircleAverageResult());
    const circleResult = Math.round(countCircleResult());

    let regionName = sessionStorage.getItem("regionName");
    if (regionName !== null && document.getElementById("regionTxt")) {
        document.getElementById("regionTxt").innerHTML = regionName
    }
    const regionClicked = () => {
        setRegionModalShow(true);
    }

    // This function will display the month on th chart
    let displayMonth;
    const displayMonth1 = () => {
        let date = new Date().getDate();
        if (date > 5) {
            displayMonth = getMonthName(new Date().getMonth() - 1);
        } else {
            displayMonth = getMonthName(new Date().getMonth() - 2);
        }
    }
    displayMonth1();

    return (
        activeStudy ? <div className="col-sm"
                           style={{
                               color: 'white',

                           }}>
                <Regions show={regionModalShow} onHide={() => setRegionModalShow(false)}/>
                <div style={{marginBottom: '0px'}} className="row col-sm-12">
                    <div className="col-sm-8" style={{marginTop: "-10px"}}>
                        <div style={{display: 'flex', fontSize: '18px', color: '#8F96B4'}}>
                            <div style={{display: 'flex'}}>
                                <img src={hierarchy} alt=""
                                     onClick={() => setModalShow(true)}
                                />
                            </div>

                            <div>
                                <span style={{marginLeft: '3px'}}
                                      onClick={() => setModalShow(true)}
                                      id="peerGroupText"
                                >{`${activeStudy?.ParentCategory}, ${activeStudy?.Category}`}
                            </span>
                                <BrowseCategory show={modalShow} onHide={() => setModalShow(false)}
                                />
                            </div>
                            <div style={{marginLeft: '15px', marginRight: '15px'}}>-</div>
                            <div style={{display: 'flex'}}>
                                <img style={{marginRight: '3px'}}
                                     src={mapPin}
                                     onClick={regionClicked}
                                     alt=""/>

                                <div onClick={regionClicked} id="regionName">
                                    {getRegionDescription(activeStudy, regions)}</div>
                            </div>
                        </div>
                        <div className="row">
                            <h3 style={{color: "#FFFFFF", fontSize: '30px'}}>
                                {activeStudy?.Name}
                                <img src={users} style={{paddingLeft: "20px"}} alt=""/>
                                <small style={{
                                    fontSize: "14px",
                                    color: '#8F96B4'
                                }}> {activeStudy?.NumOfSubscribers}</small>
                            </h3>
                        </div>
                    </div>
                    <div className="col-sm-4">

                        {isSubscriber ?
                            <AddDataPopUp type={activeStudy.TypeID} className="input-group-sm float-end"/> : null}
                    </div>
                    <div style={{padding: "4px"}}></div>

                </div>
                <div>
                    <div className='row col-sm-12'>
                        <div className='col-sm-7'>
                            <div className='card' style={{
                                color: '#A5ACCB',
                                backgroundColor: '#1f2748',
                                borderTopRightRadius: "15px",
                                borderTopLeftRadius: "15px",
                                borderBottomLeftRadius: "15px",
                                borderBottomRightRadius: "15px",
                            }}>
                                <div className='card-body'>
                                    {getChartTypeTitle(activeStudy.TypeID)}

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <b><h5 style={{color: 'white'}}> {displayMonth}</h5>
                                            </b>
                                        </div>
                                    </div>

                                    {/*{isSubscriber ? <LineChart data={studyData} name={user?.Company?.name}/> :*/}
                                    {/*    <LockedLineChart/>}*/}

                                    <LineChart data={studyData} name={user?.Company?.name} subscription={isSubscriber}/>
                                </div>
                            </div>
                        </div>
                        {isSubscriber ? <>
                            <div className='container col-sm'>
                                <h6 style={{color: '#A5ACCB'}}> ABOUT</h6>
                                <br/>
                                <p style={{color: '#A5ACCB'}}>
                                    {activeStudy?.About}
                                </p>
                                <div style={{paddingTop: "2%"}}></div>
                                <small style={{color: '#A5ACCB'}}>{user?.Company?.name}</small>
                                <p style={{marginBottom: "3px"}}>{`${
                                    studyData &&
                                    studyData.length &&
                                    (activeStudy?.TypeID === 1 ? Math.round(studyData[studyData.length - 1].Value) : studyData[studyData.length - 1].Value)}
                                    
                                 
                                    
                                    ${activeStudy?.TypeID === 1 ? '%' : ''}`}</p>
                                <ProgressBarComponent id="user-progres-bar" value={getUserLastMonthValue()}/>

                                <div style={{paddingTop: "5%"}}></div>
                                <small style={{color: '#A5ACCB'}}>Industry Average</small>
                                {/* <p color={{ color: "white" }}>{`-20%`}</p> */}
                                <p style={{
                                    marginBottom: "3px",
                                    verticalAlign: "bottom"
                                }}>{`${
                                    studyData &&
                                    studyData.length &&
                                    (activeStudy?.TypeID === 1 ? Math.round(studyData[studyData.length - 1].Average) : studyData[studyData.length - 1].Average)}
                                    ${activeStudy?.TypeID === 1 ? '%' : ''}`}</p>
                                <ProgressBarComponent id="industry-progres-bar" value={getAverageLastMonthValue()}/>


                            </div>
                        </> : <SubscribeToStudy studyAbout={activeStudy?.About} onSubscribe={onSubscribeStudy}/>}
                    </div>
                    <br/>
                    <div style={{paddingBottom: "17px"}}></div>
                    <div className='row col-sm-12'>

                        {/*{isSubscriber ?*/}
                        {/*    <Participant_breakdown data={participantData}/> : null}*/}

                        <Participant_breakdown data={participantData} unlock={isSubscriber}/>

                        {/* Circle 1*/}
                        <CircularProgressbarComponent
                            value={getCircularProgressBarValue()}
                            text={circleResult}
                            counterClockwise={circleResult < 0 ? true : false}
                            months={studyData?.length}
                            pathColor={'rgba(0, 226, 125)'}
                            trailColor={circleResult < 0 ? '#553b65' : '#353b65'}
                            title='Change from start of this period'
                            unlock={isSubscriber}
                            donutChartId="donutChart1"
                            customText="Your"
                        />
                        {/* Circle 2*/}
                        <CircularProgressbarComponent
                            value={getCircularProgressBarAverageValue()}
                            text={circleAverageResult}
                            counterClockwise={circleAverageResult < 0 ? true : false}
                            months={studyData?.length}
                            pathColor={'rgba(101,133,255)'}
                            trailColor={circleAverageResult < 0 ? '#553b65' : '#353b65'}
                            title='Change from start of this period'
                            unlock={isSubscriber}
                            donutChartId="donutChart2"
                            customText="Peer Group"
                        />
                    </div>
                </div>
            </div>
            /* If the study is not activated*/
            : <div className="col-sm" style={{color: 'white',}}>
                <div style={{marginBottom: '0px'}} className="row col-sm-12">
                    <div className="col-sm-8" style={{marginTop: "-10px"}}>
                        <div style={{display: 'flex', fontSize: '18px', color: '#8F96B4'}}>
                            <div style={{display: 'flex'}}>
                                <img src={hierarchy} alt=""
                                     onClick={() => setModalShow(true)}
                                />
                            </div>
                            <div>
                                <span id="peerGroupTitle" style={{marginLeft: '3px'}}
                                      onClick={() => setModalShow(true)}>
                                    <span id="level5Text"> {getPeerGroup4or5State}, </span>
                                    <span id="level6Text">{getPeerGroup6State}</span>

                                </span>
                                <BrowseCategory show={modalShow} onHide={() => setModalShow(false)}
                                />
                            </div>

                            <div style={{marginLeft: '15px', marginRight: '15px'}}>-</div>
                            <div style={{display: 'flex'}}>
                                <img style={{marginRight: '3px'}}
                                     src={mapPin}
                                     onClick={() => setRegionModalShow(true)} alt=""/>

                                <div id="regionTxt" onClick={() => setRegionModalShow(true)}>
                                    {getRegionName}
                                </div>
                                <Regions show={regionModalShow} onHide={() => setRegionModalShow(false)}/>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', fontSize: '18px',
                            color: '#8F96B4', marginLeft: "-23.52px",
                            width: "1230px",
                        }}>

                            {/* Blue line*/}
                            <div style={{width: "20px"}}>
                                <div style={{
                                    borderLeft: "2px solid #313B65",
                                    marginTop: "740px",
                                    marginLeft: "-1px",
                                    height: "350px",
                                }}/>
                            </div>
                            {/* Blue line*/}

                            {/* Fake image */}
                            <img
                                src={fakeImage3}
                                style={{marginLeft: "10px", width: "1230px"}}
                                alt=""/>
                            {/* Fake image */}
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default MainCard;

/*

* */
