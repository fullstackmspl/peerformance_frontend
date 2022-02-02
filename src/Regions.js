/* Regions start */

import React, {useRef, useState} from "react";
import {Col, Modal, Row} from "react-bootstrap";
import {
    peerformanceBackground2,
    peerformanceBlueButton,
    peerformanceBlueText,
    peerformanceDarkBlue,
    peerformanceGreen, peerformanceListItem
} from "./colours";
import arrowLeft from "./Styleguide/arrow_left.svg";
import {useDispatch, useSelector} from "react-redux";
import {getCityChildren, getRegionById, getRegionChildren, updateLastRegion} from "./store/dashboardActions";
import {fetchRegionChild} from "./store/dashboardFetches";
import {createStore} from 'redux'


let global = "Global";
let europe = "Europe";
let allOfUk = "UK";
let activateCites = false;

function Regions(props, regionID) {

    let dispatch = useDispatch();

    let dataExist = false;

    // State management
    const [getPreviouslySelected, setPreviouslySelected] = useState();
    const [getSelectedTxt, setSelectedTxt] = useState();


    let allRegions = JSON.parse(window.localStorage.getItem("regions"));
    console.log("allRegions", allRegions);


    // Scotland
    let scotLandLeftCol = []
    let scotLandRightCol = []

    let regionsLeftCol = []
    let regionsRightCol = []

    // Use the top region data to create the first three buttons - UK, Europe and Global
    let topRegions = useSelector(state => state.dashboard.top3Regions);

    if (topRegions.length > 1) {
        global = topRegions[0].Name;
        europe = topRegions[1].Name;
        allOfUk = topRegions[2].Name;
    }

    let createColumns2 = (data, leftCol, rightCol) => {

        for (const [index, value] of data.entries()) {
            if ((index + 1) % 2 !== 0) {
                leftCol.push(
                    <div
                        key={index}
                        style={{
                            paddingLeft: "20px",
                            paddingTop: "16px",
                            paddingBottom: "12px",
                            marginTop: "12px",
                            borderRadius: "12px",
                            backgroundColor: peerformanceBlueButton
                        }}
                        id={value.ID}
                        data-leve={value.Level}
                        data-parendId={value.ParentID}
                        data-name={value.Name}
                        data-RegionTypesId={value.RegionTypesID}
                        onClick={listClicked}
                    >
                        {value.Name}
                    </div>)

            } else {
                rightCol.push(
                    <div
                        key={index}
                        style={{
                            paddingLeft: "20px",
                            paddingTop: "16px",
                            paddingBottom: "12px",
                            marginTop: "12px",
                            borderRadius: "12px",
                            backgroundColor: peerformanceBlueButton,
                        }}
                        id={value.ID}
                        data-leve={value.Level}
                        data-parendId={value.ParentID}
                        data-name={value.Name}
                        data-RegionTypesId={value.RegionTypesID}
                        id={value.ID}
                        onClick={listClicked}
                    >
                        {value.Name}
                    </div>)
            }
        }
    }

    let [getSelectedRegionID, setSelectedRegionID] = useState();
    let previouslySelected = [];
    let listClicked = (e) => {
        sessionStorage.setItem("regionId", e.target.id); // setting the region id on session storage
        setSelectedTxt(e.target.getAttribute("data-name"))
        setSelectedRegionID(e.target.id);
        let current = getPreviouslySelected;

        if (current == null || current === "undefined") {
            setPreviouslySelected(e.target.id);
        }

        let selectedRegionId = e.target.id;

        if (current !== null || current !== selectedRegionId) {
            document.getElementById(selectedRegionId).style.color = peerformanceBlueText;
            document.getElementById(selectedRegionId).style.backgroundColor = peerformanceGreen;
            if (current > 0) {
                document.getElementById(current).style.color = "white";
                document.getElementById(current).style.backgroundColor = peerformanceBlueButton;
            }
            setPreviouslySelected(e.target.id);

        } else {
            alert("Contact the admin if you see this: Region page Error! ")
            setPreviouslySelected(e.target.id);
        }

        let selectedTxt = e.target.innerText;
        console.log("previouslySelected", previouslySelected);

        if (selectedTxt === 'Global') {
            window.localStorage.setItem("selectedRegion", selectedTxt);
            document.getElementById("citesDiv").style.display = "none";
            document.getElementById("regionsDiv").style.display = "none";
        }
        if (selectedTxt === 'Europe') {
            window.localStorage.setItem("selectedRegion", selectedTxt);
            document.getElementById("citesDiv").style.display = "none";
            document.getElementById("regionsDiv").style.display = "none";
        }

        for (let i = 0; i < towns_cities_Scotland.length; i++) {
            if (selectedTxt === towns_cities_Scotland[i]) {
                window.localStorage.setItem("selectedRegion", selectedTxt)
            }
        }

        if (selectedTxt === 'UK') {
            activateCites = true;

            dispatch(getRegionChildren(selectedRegionId))
            document.getElementById("regionsDiv").style.display = "inline";
            document.getElementById("citesDiv").style.display = "none";
        }

        if (selectedTxt === 'Scotland' || selectedTxt === "Greater London") {
            dispatch(getCityChildren(selectedRegionId))
            document.getElementById("citesDiv").style.display = "inline";
        }


        for (let i = 0; i < regions.length; i++) {
            if (selectedTxt === regions[i]) {
                document.getElementById("citesDiv").style.display = "inline";
                window.localStorage.setItem("selectedRegion", selectedTxt);
            }
        }

        window.localStorage.setItem("selectedRegionId", selectedRegionId);
    }

    let confirmSelection = () => {
        sessionStorage.setItem("regionId", getSelectedRegionID);
        // Send and update the region id on the database
        dispatch(updateLastRegion(getSelectedRegionID));
        dispatch(getRegionById(getSelectedRegionID));

        sessionStorage.setItem("regionName", getSelectedTxt)
        sessionStorage.getItem("regionName")

        window.location.reload();
    }


    const regions = useSelector(state => {
        return state.dashboard.regionChildren;
    });
    createColumns2(regions, regionsLeftCol, regionsRightCol)


    const towns_cities_Scotland = useSelector(state => {
        return state.dashboard.citesChildren;
    });

    if (activateCites === true) {
        createColumns2(towns_cities_Scotland, scotLandLeftCol, scotLandRightCol)
    }

    /* Regions end*/
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{paddingTop: "10px"}}
        >

            <div className="container-lg" style={{
                backgroundColor: peerformanceDarkBlue,
                color: "white",
            }}>
                <p></p>
                <Modal.Body className="col-sm">

                    <div style={{overflow: "hidden"}}>
                        <h6 style={{float: "left"}} onClick={props.onHide}><img src={arrowLeft} alt=""
                        /> &nbsp; &nbsp; Change peer group </h6>
                        <h6 style={{float: "right"}} onClick={props.onHide}> X </h6>
                    </div>
                    <p></p>


                    <div className="text-center">

                        <div className="container">
                            <div className="row">
                                <div className="col-sm card" style={{backgroundColor: "initial"}}>
                                    <div className="btn-group me-8" role="group" aria-label="First group">
                                        {/* we are setting the id of each button to match the sql regions table*/}
                                        <button type="button" className="btn shadow-none" id="3"
                                                onClick={listClicked}
                                                style={{
                                                    color: "white",
                                                    backgroundColor: peerformanceBlueButton,
                                                    paddingLeft: "30px",
                                                    paddingRight: "30px",
                                                }}
                                                data-name="UK">
                                            {allOfUk}
                                        </button>

                                    </div>
                                </div>

                                <div className="col-sm-1" style={{width: "4%"}}></div>
                                <div className="col-sm card" style={{backgroundColor: "initial"}}
                                     id={"keyWordSearchDiv"}>
                                    <div className="btn-group" role="group" aria-label="Second group"
                                    >
                                        <button type="button" className="btn shadow-none" id="2"
                                                onClick={listClicked}
                                                style={{
                                                    color: "white",
                                                    backgroundColor: peerformanceBlueButton,
                                                    paddingLeft: "30px",
                                                    paddingRight: "30px",
                                                }}
                                                data-name="Europe"
                                        >{europe}
                                        </button>
                                    </div>
                                </div>
                                <div className="col-sm-1" style={{width: "4%"}}></div>

                                <div className="col-sm card" style={{backgroundColor: "initial"}}
                                     id={"quickLinksDiv"}>
                                    <div className="btn-group" role="group" aria-label="Third group"
                                    >
                                        <button type="button" className="btn shadow-none" id="1"
                                                onClick={listClicked}
                                                style={{
                                                    color: "white",
                                                    backgroundColor: peerformanceBlueButton,
                                                    paddingLeft: "30px",
                                                    paddingRight: "30px",
                                                }}
                                                data-name="Global"
                                        >{global}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>

                    <div>
                        <div style={{
                            backgroundColor: peerformanceBackground2,
                            paddingLeft: "10px",
                            paddingRight: "20px",
                            paddingTop: "0px",
                            paddingBottom: "20px",
                            borderRadius: "10px",

                        }}>
                            <div>
                                <div></div>
                                <div className="container container-fluid overflow-auto"
                                >
                                    <div style={{height: "20px"}}></div>

                                    <div className="container container-fluid overflow-auto" style={{
                                        height: "530px",
                                        overflowY: "scroll",
                                        overflow: "scroll",
                                        scrollBehavior: "smooth",
                                        scrollbarColor: "green"
                                    }}>
                                        <div id={"regionsDiv"} style={{display: "none"}}>
                                            <p style={{fontSize: "18px"}}>Regions</p>
                                            <Row>
                                                <Col>{regionsLeftCol}</Col>
                                                <Col>{regionsRightCol}</Col>
                                            </Row>
                                        </div>
                                        <br/>

                                        <div id={"citesDiv"} style={{display: "none"}}>
                                            <p style={{fontSize: "18px"}}>Cites</p>
                                            <Row>
                                                <Col>{scotLandLeftCol}</Col>
                                                <Col>{scotLandRightCol}</Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <p className="float-end"> Your selected location is: <b id="yourSelectedRegion"
                                        style={{color: peerformanceGreen}}>{getSelectedTxt}</b></p>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline-success float-end"
                                style={{margin: "10px"}}
                                onClick={confirmSelection}> Confirm Selection
                        </button>
                    </div>
                </Modal.Body>
            </div>

        </Modal>
    )
}

export default Regions;