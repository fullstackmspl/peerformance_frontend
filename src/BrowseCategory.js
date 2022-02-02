import {Button, Modal} from "react-bootstrap";
import React, {useState, Fragment} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {
    getRegionChildren,
    getRegions,
    getStudies,
    updateLastPeerGroup,
    updateLastRegion
} from './store/dashboardActions';
import arrowLeft from './Styleguide/arrow_left.svg';
import searchIcon from './Styleguide/search_icon.svg';
import circleBackground from './Styleguide/circle_background.svg';
// import getQuickLinks from "./Utils/quickLinks";
import urlencode from 'urlencode'
import Regions from './Regions'

import {
    peerformanceDarkBlue,
    peerformanceDarkBlue2,
    peerformanceBlueButton,
    peerformanceBackground2,
    peerformanceListItem,
    peerformanceGreen,
    peerformanceDarkGreen,
    peerformanceBlueText
} from "./colours"
import {fetchPeerGroup, fetchStudyByRegion, fetchTop3Level} from "./store/dashboardFetches";

let _ = require('lodash');
let searchedSIC = [];
let searchedCategory = [];
let searchedId = [];

let Category = "Nothing"
Category = JSON.parse(localStorage.getItem('categories'));

let dataStringify = JSON.stringify(localStorage.getItem('categories')).replace(/\\"/g, '"');
let tabText = "Find your peer group";
let customPaddingTop = "0px";


// This function will hide industry filter and quick links div
function keyWordSearchFn() {
    let industryFilter = document.getElementById("industryFilter");
    let keyWordSearch = document.getElementById("keyWordSearch");
    let quickLinks = document.getElementById("quickLinks");
    let keyWordSearchBtn = document.getElementById("keyWordSearchBtn");
    let industryFilterBtn = document.getElementById("industryFilterBtn");
    let quickLinksBtn = document.getElementById("quickLinksBtn");
    tabText = ("Change peer group");


    if (industryFilter.style.display === "none" || quickLinks.style.display === "none") {
        keyWordSearch.style.display = "block";
        industryFilter.style.display = "none";
        quickLinks.style.display = "none";

        keyWordSearchBtn.style.background = peerformanceGreen;
        document.getElementById("keyWordSearchDiv").style.background = peerformanceGreen;
        keyWordSearchBtn.style.color = peerformanceBlueText;

        industryFilterBtn.style.background = peerformanceBlueButton;
        document.getElementById("industryFilterDiv").style.background = peerformanceBlueButton;
        industryFilterBtn.style.color = "white";

        quickLinksBtn.style.background = peerformanceBlueButton;
        document.getElementById("quickLinksDiv").style.background = peerformanceBlueButton;
        quickLinksBtn.style.color = 'white';

        tabText = ("Change peer group");

    } else {
        industryFilter.style.display = "none";
        quickLinks.style.display = "none";
        tabText = ("Change peer group");
    }
}

// This function will hide keyword search and quick links div
function industryFilterFn() {
    let industryFilter = document.getElementById("industryFilter");
    let keyWordSearch = document.getElementById("keyWordSearch");
    let quickLinks = document.getElementById("quickLinks");
    let keyWordSearchBtn = document.getElementById("keyWordSearchBtn");
    let industryFilterBtn = document.getElementById("industryFilterBtn");
    let quickLinksBtn = document.getElementById("quickLinksBtn");

    if (keyWordSearch.style.display === "none" || quickLinks.style.display === "none") {
        industryFilter.style.display = "block";
        quickLinks.style.display = "none";
        keyWordSearch.style.display = "none";

        keyWordSearchBtn.style.background = peerformanceBlueButton;
        document.getElementById("keyWordSearchDiv").style.background = peerformanceBlueButton;
        keyWordSearchBtn.style.color = 'white';

        industryFilterBtn.style.background = peerformanceGreen;
        document.getElementById("industryFilterDiv").style.background = peerformanceGreen;
        industryFilterBtn.style.color = peerformanceBlueText;

        quickLinksBtn.style.background = peerformanceBlueButton;
        document.getElementById("quickLinksDiv").style.background = peerformanceBlueButton;
        quickLinksBtn.style.color = 'white';


    } else {
        industryFilter.style.display = "none";
        quickLinks.style.display = "none";
    }
}

// This function will hide keyword search and industry div
function quickLinksFn() {

    let industryFilter = document.getElementById("industryFilter");
    let keyWordSearch = document.getElementById("keyWordSearch");
    let quickLinks = document.getElementById("quickLinks");
    let keyWordSearchBtn = document.getElementById("keyWordSearchBtn");
    let industryFilterBtn = document.getElementById("industryFilterBtn");
    let quickLinksBtn = document.getElementById("quickLinksBtn");

    if (keyWordSearch.style.display === "none" || industryFilter.style.display === "none") {
        quickLinks.style.display = "block";
        industryFilter.style.display = "none";
        keyWordSearch.style.display = "none";

        keyWordSearchBtn.style.background = peerformanceBlueButton;
        document.getElementById("keyWordSearchDiv").style.background = peerformanceBlueButton;
        keyWordSearchBtn.style.color = 'white';

        industryFilterBtn.style.background = peerformanceBlueButton;
        document.getElementById("industryFilterDiv").style.background = peerformanceBlueButton;
        industryFilterBtn.style.color = 'white';

        quickLinksBtn.style.background = peerformanceGreen;
        document.getElementById("quickLinksDiv").style.background = peerformanceGreen;
        quickLinksBtn.style.color = peerformanceBlueText;
        tabText = ("Change peer group");
    } else {
        industryFilter.style.display = "none";
        quickLinks.style.display = "none";
        tabText = ("Change peer group");
    }
}

function BrowseCategory(props) {
    const dispatch = useDispatch();
    let cards = [];
    let row = [];
    let results = getLevel1_Elements();
    let [children, setChildren] = useState(results);
    let [previousTitle, setPreviousTitle] = useState();
    let [previousKeys, setPreviousKeys] = useState(null);
    let [level6Style, setLevel6Style] = useState();
    let [searchResults, setSearchResults] = useState([]);
    let [selectedLevel6, setSelectedLevel6] = useState();
    let [regionModalShow, setRegionModalShow] = useState(false);
    let [getLevel4_5Parent, setLevel4_5Parent] = useState(sessionStorage.getItem("fetchedLevel4SIC"));
    let [getLevel6Parent, setLevel6Parent] = useState(sessionStorage.getItem("fetchedLevel6SIC"));
    let [getLevel4_5txt, setLevel4_5txt] = useState(false);
    let regionId = sessionStorage.getItem("regionId");

    let getUserId = JSON.parse(sessionStorage.getItem("user"));
    getUserId = JSON.stringify(getUserId.userId);


    // Search
    function checkLevel(SICCode, ID) {

        let sic_Code_splitter = SICCode.split(".");
        //alert("sic_Code_splitter:" + sic_Code_splitter)
        // alert("id:" + ID)

        if (sic_Code_splitter.length === 6) {
            return SICCode
        }

        if (sic_Code_splitter.length <= 5) {
            industryFilterFn();
            return sic_Code_splitter.length
        }
    }

    let [searchPlaceholder, setSearchPlaceholder] = useState("e.g. recruitment");

    // get all regions
    const regions = useSelector(state => {
        return state.dashboard.regions;
    });

    window.localStorage.setItem("regions", JSON.stringify(regions));

    function getLevel1_Elements() {
        let level1 = [];
        let myObj = new Object();
        Object.keys(Category).map((val, k) => {
            const theValue = Category[val];
            myObj = {
                [theValue.SIC]: {
                    "SIC": theValue.SIC,
                    "Category": theValue.Category,
                    "ID": theValue.ID
                }
            };
            level1.push(myObj)
        });
        let result = _.extend.apply(null, level1);
        return result
    }

    function SICCodeSorter(SICCode) {
        let sic_Code_splitter = SICCode.split(".");
        let changePeerGroup = "Change peer group";
        customPaddingTop = "0px";


        // level 1
        if (sic_Code_splitter.length === 1) {
            customPaddingTop = "20px";
            tabText = changePeerGroup;
            setPreviousTitle(Category[SICCode].Category);
            setPreviousKeys(""); // get previous keys
            return Category[SICCode]
        }

        // level 2
        if (sic_Code_splitter.length === 2) {
            customPaddingTop = "20px";
            tabText = changePeerGroup;
            let level1 = sic_Code_splitter[0];
            let level2 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1];

            setPreviousTitle(Category[level1][level2].Category);
            setPreviousKeys(level1); // get previous keys
            return Category[level1][level2];
        }

        // level 3
        if (sic_Code_splitter.length === 3) {
            customPaddingTop = "20px";
            tabText = changePeerGroup;
            let level1 = sic_Code_splitter[0];
            let level2 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1];
            let level3 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1] + '.' + sic_Code_splitter[2];

            setPreviousTitle(Category[level1][level2][level3].Category)
            setPreviousKeys(level2); // get previous keys
            return Category[level1][level2][level3];
        }

        // level 4
        if (sic_Code_splitter.length === 4) {
            customPaddingTop = "20px";
            tabText = changePeerGroup;
            let level1 = sic_Code_splitter[0];
            let level2 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1];
            let level3 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1] + '.' + sic_Code_splitter[2];
            let level4 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1] + '.' + sic_Code_splitter[2] + '.' + sic_Code_splitter[3];

            setPreviousTitle(Category[level1][level2][level3][level4].Category)
            setPreviousKeys(level3); // get previous keys
            return Category[level1][level2][level3][level4];
        }

        // level 5
        if (sic_Code_splitter.length === 5) {
            customPaddingTop = "20px";
            tabText = changePeerGroup;
            let level1 = sic_Code_splitter[0];
            let level2 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1];
            let level3 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1] + '.' + sic_Code_splitter[2];
            let level4 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1] + '.' + sic_Code_splitter[2] + '.' + sic_Code_splitter[3];
            let level5 = sic_Code_splitter[0] + '.' + sic_Code_splitter[1] + '.' + sic_Code_splitter[2] + '.' + sic_Code_splitter[3] + '.' + sic_Code_splitter[4];

            setPreviousTitle(Category[level1][level2][level3][level4][level5].Category);

            setPreviousKeys(level4); // get previous keys
            return Category[level1][level2][level3][level4][level5];
        }
    }

    function goBack() {
        if (previousKeys === null) {
            setPreviousTitle(null);
            setChildren(results);
            tabText = ("Find your peer group ")
        }
        if (previousKeys !== null && previousKeys.length >= 1) {
            getChild(previousKeys);
        }
        if (previousKeys !== null && previousKeys.length <= 0) {
            setPreviousTitle(null);
            setChildren(results);
            tabText = ("Find your peer group")
        }
    }

    function getChild(SICCode) {
        let children = [];
        let myObj = {};

        if (SICCode && SICCode.split(".").length <= 5) {
            let counter = 0; // Counter Flag

            for (const [key, value] of Object.entries(SICCodeSorter(SICCode))) {
                myObj = {
                    [value.SIC]: {
                        "SIC": value.SIC,
                        "Category": value.Category,
                        "key": key,
                        "ID": value.ID
                    }
                };
                if (counter === 0 && value.SIC) {
                    let level = value.SIC.split(".").length;
                    counter = 1;
                    if (level === 6) {
                        // setLevel6Style("pink")
                    } else {
                        // setLevel6Style("")
                    }
                }
                children.push(myObj)
            }
            let result = _.extend.apply(null, children);
            setChildren(result)
        }
    }

    // Industry filter
    const listClicked = (e, peerGroupID) => {
        // if (getLevel4_5Parent) {
        //     getChild(getLevel4_5Parent)
        // } else {
        let searchId = e.target.id;
        getChild(searchId);
        let level = searchId.split(".").length;
        let level6txt;

        if (document.getElementById("selectedLevel5")) {
            setLevel4_5txt(document.getElementById("selectedLevel5").innerText)
        }

        if (level === 4 || level === 5) {
            fetchTop3Level();
            // fetch all regions
            dispatch(getRegions());
            // set level 5 title
            setLevel4_5txt(e.target.textContent);
            if (!e.target.textContent) {
                if (document.getElementById("selectedLevel5")) {
                    setLevel4_5txt(document.getElementById("selectedLevel5").innerText)
                }
            }
        }

        if (level === 6) {
            let leve5Txt = document.getElementById("selectedLevel5").innerText;
            e.target.style.color = peerformanceGreen;
            setSelectedLevel6(searchId);
            level6txt = e.target.textContent;

            sessionStorage.setItem("peerGroupId", peerGroupID);
            dispatch(updateLastPeerGroup(peerGroupID)); // send an update to the database

            // Set the peer group that the user last selected
            localStorage.setItem("lastSelectedPeerGroup", peerGroupID)

            sessionStorage.setItem("fetchedLevel4", leve5Txt); // fine
            sessionStorage.setItem("fetchedLevel6", level6txt); // fine


            // getting the region id from session storage
            let getRegionFromStore = sessionStorage.getItem("regionId");
            dispatch(getStudies(peerGroupID, getRegionFromStore));

            if (regionId === null || regionId === undefined || regionId.length <= 0) {
                setRegionModalShow(true);
            } else {
                if (document.getElementById("selectedLevel5")) {
                    // alert("we are here:" + document.getElementById("selectedLevel5").innerText)
                    if (document.getElementById("level5Text")) {
                        document.getElementById("level5Text").innerText = leve5Txt
                    }
                    window.location.reload();
                }
                props.onHide();
            }
        }
    }

// Search function
    function searchForString() {

        let userInput = document.getElementById("searchBox").value;
        userInput = userInput.replace("\\", "\\\\");
        userInput = userInput.replace("(", "\\(");
        userInput = userInput.replace(")", "\\)");
        userInput = userInput.replace(".", "\\.");
        userInput = userInput.replace("/", "\\/");

        if (userInput.length > 0) {
            searchedSIC = [];
            searchedCategory = [];
            searchedId = []

            // TODO: Add enter functions

            let regex = new RegExp(`"ID":(?<id>[0-9]+),"SIC":"(?<sic>[A-Z]\\.[0-9]+\\.[0-9]+\\.[0-9]+(?:\\.[0-9]+){0,2})",` +
                `"Category":"(?<category>[a-zA-Z0-9 ,;\\/\\(\\)\\.-]*`
                + userInput + `[a-zA-Z0-9 ,;\\/\\(\\)\\.-]*)"`, "ig");

            let output;
            while (output = regex.exec(dataStringify)) {
                searchedSIC.push(output.groups.sic);
                searchedCategory.push(output.groups.category);
                searchedId.push(output.groups.id);
                //searchedId.push(16775); // TODO - This is hard coded
            }

            // Setting the first element within the results list to contain a background and boarder
            if (document.getElementById("parentResults")) {
                document.getElementById("parentResults").style.backgroundColor = peerformanceListItem;
            }
            setSearchResults(searchedCategory);
        }
    }

    function searchListClicked(e) {
        let searchID = e.target.id;
        let peerGroupID = e.target.getAttribute("peerGroupID");

        let length = checkLevel(searchedSIC[searchID], searchedId[searchID]);
        if (length !== 6 && typeof (length) === "number") {
            getChild(searchedSIC[searchID]);
        } else {
            // getChild(length);
            if (sessionStorage.getItem("regionId")) {
                // getting the region id from session storage
                let getRegionFromStore = sessionStorage.getItem("regionId");

                dispatch(updateLastPeerGroup(peerGroupID));
                dispatch(getStudies(peerGroupID, getRegionFromStore));

                // // Set title
                window.localStorage.setItem("selectedLevel6Id", peerGroupID);

                // store the last level 5 element that was selected
                window.localStorage.setItem("selectedLevel5",
                    document.getElementById("selectedLevel5").innerText);

                // store the last level 6 element that was selected
                window.localStorage.setItem("selectedLevel6", e.target.innerText)

                if (regionId === null || regionId === undefined || regionId === "undefined" || regionId.length <= 0
                ) {
                    setRegionModalShow(true);
                } else {
                    fetchPeerGroup(peerGroupID);
                    window.location.reload();
                    // props.onHide();
                }

            }
        }
    }

    function quickLinks(SIC) {
        getChild(SIC);
        industryFilterFn();
    }

    // Generate cards for quick links
    function generateHtml() {

        cards = [];
        let quickLinkData = JSON.parse(localStorage.getItem('quickLinks'));
        let newcard;
        let counter;
        let emptyCard = (<Fragment>
            <div className="col-sm">
                <div className="">
                </div>
            </div>
        </Fragment>)


        for (let i = 0; i < quickLinkData.length; i++) {
            let logo = urlencode(quickLinkData[i].Icon);
            logo = "data:image/svg+xml," + logo;
            console.log("Here are here: ", quickLinkData[i].PeerGroupID);
            newcard = (
                <Fragment>
                    <div className="col-sm">
                        <div className="card" style={{
                            backgroundColor: peerformanceListItem, paddingTop: "8px"
                        }}>
                            <div type="button" className="card-body text-center"
                                 style={{background: peerformanceListItem}} id={quickLinkData[i].SIC}
                                 onClick={() => quickLinks(quickLinkData[i].SIC)}>
                                <div style={{position: "relative", left: "0", top: "0"}}>
                                    <img src={circleBackground}
                                         className="quickLinkCircleBackGround"/>
                                    <img id={"icon" + quickLinkData[i].SIC} className="quickLinkIcon" src={logo}/>
                                </div>
                                <br/>
                                <p
                                    style={{fontSize: "15px", color: "#A5ACCB"}}
                                > {quickLinkData[i].Name}</p>
                            </div>
                        </div>
                        <br/>
                    </div>
                </Fragment>
            )
            counter = 1 + i;

            if (counter <= 4) {
                console.log("counter stage 1:", counter);
                console.log("counter", quickLinkData[i].ID);
                cards.push(
                    <Fragment>
                        {newcard}
                    </Fragment>
                );

                row.push(cards)
                cards = []
            }
            if (counter >= 5 && counter <= 8) {
                console.log("counter stage 2:", counter);
                console.log("counter stage 2:", quickLinkData[i].ID);
                cards.push(
                    <Fragment>
                        {newcard}
                    </Fragment>
                );

                row.push(cards)
                cards = []
            }
            if (counter >= 9) {
                cards.push(
                    <Fragment>
                        {newcard}
                    </Fragment>
                );
                row.push(cards)
                cards = []
            }
        }

        let difference;

        if (row.length < 4) {
            difference = 4 - row.length;
            for (let x = 0; x < difference; x++) {
                row.push(emptyCard)
            }

        } else if (row.length < 8) {
            difference = 8 - row.length;
            for (let x = 0; x < difference; x++) {
                row.push(emptyCard)
            }

        } else if (row.length < 12) {
            difference = 12 - row.length;
            for (let x = 0; x < difference; x++) {
                row.push(emptyCard)
            }

        }
        console.log(row);
    }

    generateHtml();

    function clearSearch() {
        if (searchResults.length > 0) {
            setSearchResults([""]);
            // Setting the first element within the results list to not contain a background and boarder
            document.getElementById("parentResults").style.backgroundColor = "initial"
            document.getElementById("parentResults").style.border = "initial"
            document.getElementById('searchBox').value = '';
        }
    }

    window.onclick = e => {
        let peerGroupId = e.target.id;
        if (peerGroupId === "peerGroupText" || peerGroupId === "peerGroupTitle" || peerGroupId === "level5Text" || peerGroupId === "level6Text") {
            if (getLevel4_5Parent) {
                getChild(getLevel4_5Parent)
                if (getLevel6Parent) {
                    if (document.getElementById(getLevel6Parent)) {
                        let parentDiv = "parent" + getLevel6Parent;
                        document.getElementById(parentDiv).style.background = peerformanceGreen;
                        document.getElementById(parentDiv).style.color = peerformanceBlueText;
                    }
                }
            }
        }
    }
// Search
    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{padding: "70px"}}
        >

            <Regions show={regionModalShow} onHide={() => setRegionModalShow(false)}/>
            <div className="container-lg" style={{backgroundColor: peerformanceDarkBlue, color: "white"}}>
                <p></p>
                <Modal.Body className="col-sm">

                    <div style={{overflow: "hidden"}}>
                        <h6 style={{float: "left"}}><img src={previousKeys !== null ? arrowLeft : null} alt=""
                                                         onClick={goBack}/> &nbsp; &nbsp; {tabText}</h6>
                        <h6 style={{float: "right"}} onClick={props.onHide}> X </h6>
                    </div>
                    <p></p>


                    <div className="text-center">

                        <div className="container">
                            <div className="row">
                                <div className="col-sm card" style={{
                                    backgroundColor: peerformanceGreen, color: peerformanceBlueText
                                }} id={"industryFilterDiv"}>
                                    <div className="btn-group me-8" role="group" aria-label="First group">
                                        <button type="button" className="btn shadow-none" id={"industryFilterBtn"}
                                                onClick={industryFilterFn}
                                        >Industry filter
                                        </button>

                                    </div>
                                </div>

                                <div className="col-sm-1" style={{width: "4%"}}></div>
                                <div className="col-sm card" style={{backgroundColor: peerformanceBlueButton}}
                                     id={"keyWordSearchDiv"}>
                                    <div className="btn-group" role="group" aria-label="Second group">
                                        <button type="button" className="btn shadow-none" id={"keyWordSearchBtn"}
                                                style={{color: "white"}}
                                                onClick={keyWordSearchFn}
                                        >
                                            Key Word Search
                                        </button>
                                    </div>
                                </div>
                                <div className="col-sm-1" style={{width: "4%"}}></div>

                                <div className="col-sm card" style={{backgroundColor: peerformanceBlueButton}}
                                     id={"quickLinksDiv"}>
                                    <div className="btn-group" role="group" aria-label="Third group">
                                        <button type="button" className="btn shadow-none" id={"quickLinksBtn"}
                                                style={{color: "white"}}
                                                onClick={quickLinksFn}>
                                            Quick links
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
                            paddingTop: customPaddingTop
                        }}>

                            {/* start Browse*/}
                            <div id={"industryFilter"}>
                                <br/>
                                <h5 className="text-center container"
                                    id={"selectedLevel5"}
                                    style={{color: peerformanceGreen}}>{previousTitle}</h5>
                                <br/>
                                <div className="container-fluid overflow-auto"
                                     style={{
                                         height: "500px",
                                         overflowY: "scroll",
                                         overflow: "scroll",
                                         scrollBehavior: "smooth",
                                         scrollbarColor: "green"
                                     }}>

                                    {Object.keys(children).map((val, k) => {
                                        console.log(`val`, val)
                                        const theValue = children[val];
                                        console.log(`theValue-------`, theValue);
                                        let myString = '';
                                        if (theValue.SIC === selectedLevel6) {
                                            myString = peerformanceGreen;
                                        }
                                        if (theValue.Category) {
                                            return (
                                                <div>
                                                    <div className="card"
                                                         id={"parent" + theValue.SIC}
                                                         style={{backgroundColor: peerformanceListItem,}}>
                                                        <onHover>
                                                            <div className="card-body">
                                                                <h7 key={theValue.SIC} id={theValue.SIC}
                                                                    onClick={e => listClicked(e, theValue.ID)}
                                                                    style={{background: level6Style, color: myString}}>
                                                                    &nbsp; {theValue.Category}
                                                                </h7>
                                                            </div>
                                                        </onHover>
                                                    </div>
                                                    <p></p>
                                                </div>
                                            )
                                        }
                                    })
                                    }

                                </div>
                                <br/>
                            </div>
                            {/* end Browse*/}

                            {/* Start Key word search */}
                            <div id={"keyWordSearch"} style={{display: "none"}}>
                                <br/>
                                <p className={"text-center"}> Search for a category</p>
                                <div className="container-fluid overflow-auto" style={{
                                    height: "492px",
                                    overflowY: "scroll",
                                    overflowX: "scroll",
                                    overflow: "scroll",
                                    scrollBehavior: "smooth",
                                    scrollbarColor: "green"
                                }}>
                                    <div className="container-fluid overflow-auto">
                                        <div className="row">
                                            <div className="col-sm-2">
                                            </div>
                                            <div className="col-sm">

                                                <div className="card">

                                                    <div className={"input-group col-xs-2 text-center"}
                                                    >
                                                        <input style={{
                                                            background: peerformanceDarkBlue2,
                                                            paddingTop: "10px",
                                                            paddingBottom: "10px",
                                                            paddingLeft: "25px",
                                                            paddingRight: "15px",
                                                            color: "white"

                                                        }} type="text"
                                                               className="form-control" placeholder={searchPlaceholder}
                                                               id="searchBox"
                                                               onKeyPress={(e) => {
                                                                   if (e.key === "Enter") {
                                                                       searchForString()
                                                                   }
                                                               }}
                                                               aria-label="Username" aria-describedby="basic-addon1"
                                                        />
                                                        <span className={"input-group-text"} id="basic-addon1"
                                                              style={{background: peerformanceDarkGreen}}>
                                                        <img id={"searchIconBtn"} src={searchIcon} alt=""
                                                             onClick={searchForString}/>
                                                        </span>
                                                    </div>
                                                    <Button variant="danger" onClick={clearSearch}> Clear
                                                        Search </Button>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>

                                    <div id="searchResults">
                                        {searchResults.map((result, index) => (
                                            <div>
                                                <div className="card" style={{backgroundColor: peerformanceListItem}}
                                                     id="parentResults">
                                                    <div className="card-body" id={searchedId[index]}>

                                                        <h7 key={index} id={index} peerGroupID={searchedId[index]}
                                                            onClick={searchListClicked}>
                                                            &nbsp; {result}
                                                        </h7>
                                                    </div>
                                                </div>
                                                <p></p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <br/>

                            </div>

                            {/* end Key word search */}

                            {/* Quick links */}
                            <div id={"quickLinks"} style={{display: "none"}}>
                                <br/>
                                <p className={"text-center"}> Quick Links</p>
                                <div className="container-fluid overflow-auto" style={{
                                    height: "515px",
                                    overflowY: "scroll",
                                    overflow: "scroll",
                                    scrollBehavior: "smooth",
                                    scrollbarColor: "green",
                                }}>
                                    <div className="row"
                                    >
                                        {row}
                                        <br/>
                                    </div>
                                </div>
                            </div>
                            {/* End Quick links */}
                        </div>
                    </div>
                </Modal.Body>
                <br/>
            </div>
        </Modal>
    );
}

export default BrowseCategory;