import React, {useState, useEffect} from 'react';
import {Button, Modal, Tab, Tabs} from "react-bootstrap";

import NavigationHeader from "./NavBar";
import MainCard from "./MainCard";
import LeftSideNav from "./LeftSideNav";
import './App.css';
import exampleStudy from './Styleguide/example_study.svg'

import {useDispatch} from 'react-redux';

import {
    getRegionChildren,
    getRegions,
    getTop3Regions,
    getUserInfo,
    getUserSubscriptions
} from './store/dashboardActions';
import AppLoading from "./Loading";
import {isNull} from "lodash";


function Dashboard(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
        dispatch(getRegions());
        dispatch(getUserSubscriptions());
        dispatch(getTop3Regions());
        dispatch(getRegionChildren());
    }, [dispatch]);


    const [getPeerGroupId, setPeerGroupId] = React.useState(sessionStorage.getItem('peerGroupId'));
    const [getRegionId, setRegionId] = React.useState(sessionStorage.getItem("regionId"));
    const [getFetchedLevel4, setFetchedLevel4] = React.useState(sessionStorage.getItem("fetchedLevel4"));

    let getNewUser;
    if (!sessionStorage.getItem('peerGroupId') || !localStorage.getItem("categories")) {
        return <AppLoading/>
    }

    //if (peerGroupId === "null" || peerGroupId === null || peerGroupId === undefined) {
    if (getRegionId === "null") {
        getNewUser =
            <div style={{marginTop: "-174.5px", marginLeft: "10px"}}>
                <img src={exampleStudy} height='1080' width="1600" style={{marginLeft: "10px"}} alt=""/>
            </div>;
    } else {
        getNewUser = <div className="row">
            <div style={{color: 'white', width: "328px"}}>
                <LeftSideNav/>
            </div>

            <div style={{width: "20px"}}>
                <div style={{
                    borderLeft: "2px solid #313B65",
                    marginTop: "-48.2px",
                    height: "810px",
                }}/>
            </div>
            <MainCard/>
        </div>
    }
    return (
        <div>
            <div style={{backgroundColor: "#232D53", width: "100%"}}>
                <div style={{backgroundColor: "#232D53", width: "1600px"}}>
                    <NavigationHeader/>
                </div>
            </div>
            <br/>
            <br/>
            <div className="container-fluid" style={{margin: "0px", padding: "0px", width: "1600px"}}>
                <div id="mainCardDisplay" style={{display: "block"}}>
                    {getNewUser}
                </div>

                <div>
                    <div id="exampleStudyDisplay" style={{display: "none"}}>
                        <div style={{marginTop: "-49px"}} id='exampleStudy2'>
                            <img src={exampleStudy} width="1600" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;