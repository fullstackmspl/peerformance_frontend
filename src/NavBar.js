import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from './App.css'
// import {decryptDataCTR} from './Utils/DecryptDataCTR';
import {getPeerGroupSession, getUser, removeUserSession,} from './Utils/Common';
import logo from './Styleguide/logo_gorizontal.svg'
import homeIcon from './Styleguide/home.svg'
import bell from './Styleguide/bell.svg'
import {useHistory} from "react-router-dom";

import {peerformanceGreen, peerformanceMenuText} from "./colours";
import BrowseCategory from "./BrowseCategory";
import {useSelector, useDispatch} from 'react-redux';

function NavigationHeader(props) {
    const isLastPeerGroup = useSelector(state => state.dashboard.lastPeerGroupSelected4Or5);
    const [modalShow, setModalShow] = React.useState(false);
    let [getShowExample, setShowExample] = useState('Show Example Study');
    let [getCanShowExample, setCanShowExample] = useState(false);
    const user = getUser();


    // if (modalShow === true) {
    //     if (document.getElementById("A")) {
    //         document.getElementById("A").click()
    //     }
    // }

    let history = useHistory();
    const handleLogout = () => {
        removeUserSession();
        history.push("/")
        // props.history.push('/home'); // push the user to the home page when they logout
    }

    useEffect(() => {
        setModalShow(!isLastPeerGroup);
    }, [isLastPeerGroup]);


    let exampleStudyDisplay = document.getElementById("exampleStudyDisplay");
    let mainCardDisplay = document.getElementById("mainCardDisplay");

    let showExampleStudy = () => {
        if (getCanShowExample === false) {
            exampleStudyDisplay.style.display = "inline-block";
            mainCardDisplay.style.display = "none";
            setCanShowExample(true)
            setShowExample("Hide Example Study")
            document.getElementById("exampleStudyParagraph").style.color = "#FE648D"
        }

        if (getCanShowExample === true) {
            exampleStudyDisplay.style.display = "none";
            mainCardDisplay.style.display = "block";
            setShowExample("Show Example Study")
            setCanShowExample(false)
            document.getElementById("exampleStudyParagraph").style.color = "#7b84a8"
        }
    }

    return (

        <div>
            <div className="container-fluid">

                <div className="row" style={{paddingTop: "15px"}}>
                    <div className="col-sm-3" style={{color: 'white', width: "355px"}}>
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="" width="260" style={{paddingLeft: "2%"}}/>
                        </a>

                        <nav className="navbar navbar-expand-lg">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </nav>
                    </div>
                    <div className="col-md-5" style={{color: 'white', width: "650px", paddingTop: "1%"}}>

                        <div className="row">
                            <div className="col-sm-1 noPadding"
                                 style={{width: "100px"}}>
                                <p style={{color: peerformanceGreen, fontSize: "13px", marginLeft: "20px"}}>Home</p>
                                <img src={homeIcon}
                                     alt=""
                                     width="16"
                                     height="22" style={{marginTop: "-81px",}}/>

                            </div>
                            <div className="col-sm-1 noPadding" style={{width: "100px", marginLeft: "-12px"}}>
                                <p style={{color: peerformanceMenuText, fontSize: "13px"}}> Quick Links </p>
                            </div>
                            <div className="col-sm-1 noPadding" style={{width: "100px", marginLeft: "8px"}}>
                                <p style={{color: peerformanceMenuText, fontSize: "13px"}}> About Us</p>
                            </div>


                            <div className="col-sm-1 noPadding" style={{width: "100px", marginLeft: "-10px",}}>
                                <p style={{color: peerformanceMenuText, fontSize: "13px"}}>Contact Us</p>
                            </div>

                            <div className="col-sm-1 noPadding" style={{width: "80px", marginLeft: "-10px"}}>
                                <p style={{color: peerformanceMenuText, fontSize: "13px"}}>More</p>
                            </div>


                            <div className="col-sm-1 noPadding"
                                 style={{width: "170px", marginLeft: "-10px"}}
                                 id="exampleStudyDiv" onClick={showExampleStudy}>
                                <p style={{color: peerformanceMenuText, fontSize: "13px"}}
                                   id="exampleStudyParagraph"
                                >{getShowExample}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col" style={{paddingTop: "1%", marginRight: "0px",}}>
                        <div className="row float-end">

                            <div className="col-sm-1 noPadding" style={{width: "140px", marginLeft: "0px"}}>

                                <p style={{color: "#37D881", fontSize: "13px"}}
                                   onClick={() => setModalShow(true)}>
                                    Change peer group </p>
                                <BrowseCategory show={modalShow} onHide={() => setModalShow(false)}
                                />

                            </div>

                            <div className="col-sm-1" style={{marginRight: "0px"}}>
                                <a href=""
                                >
                                    <img src={bell} style={{
                                        display: "block",
                                        backgroundSize: "contain",
                                        textDecoration: "none",
                                    }} alt=""/>
                                </a>

                            </div>

                            <div className="col-sm-2 noPadding" style={{fontSize: "18px", marginTop: "-6px"}}>
                                <p style={{color: "#37D881"}}>
                                    <NavDropdown title={user.username} id="nav-dropdown"
                                                 style={{fontSize: "13px"}}>
                                        <NavDropdown.Item eventKey="4.1" style={{color: "black"}}> Profile</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="4.1" style={{color: "white"}}> <img
                                            src="https://picsum.photos/35/35"
                                            className="rounded-circle"/></NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item eventKey="4.4">
                                            <div className="">
                                                <p>Welcome {user.name}  &nbsp;  &nbsp;
                                                    <Button className="btn btn-sm btn-danger" onClick={handleLogout}
                                                            value="Logout">Logout </Button></p>
                                            </div>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </p>
                                <Nav>
                                </Nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavigationHeader;

