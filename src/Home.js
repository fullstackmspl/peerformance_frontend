import {Navbar, Nav, NavDropdown, Button, FormControl, Form, Col, Container, Row, InputGroup} from 'react-bootstrap';
import React, {useState} from 'react';
import axios from 'axios';
import {setUserSession} from './Utils/Common';
import {decryptKeyCBC} from './Utils/DecryptKeyCBC';
import PeerformanceLogo from '../src/assets/peerformance_logo.svg';
import greenTick from "../src/Styleguide/icons/green_tick.svg"
import eye_off from "../src/Styleguide/icons/eye_off.svg"
import eye_on from "../src/Styleguide/icons/eye_on.svg"
import loadData from "./Utils/category";
import CookieConsent from "react-cookie-consent";

import {peerformanceBabyBlue, peerformanceDarkBlue} from "./colours";
import range from "./Utils/getParticipantRange";
import {fetchPeerGroup, fetchRegionById} from "./store/dashboardFetches";
import {getRegionById} from "./store/dashboardActions";


function Home(props) {
    const [loading, setLoading] = useState(false);
    let username = useFormInput('');
    let password = useFormInput('');
    let categoryTime = localStorage.getItem('categoryTime');
    const [errorMsg, setErrorMsg] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);


    // handle button click of login form
    const handleLogin = () => {

        setLoading(true);

        axios.post('/login', {
            username: username.value,
            password: password.value,
            categoryTime: categoryTime,
        }).then(response => {
            // Create variable for all of the values that we have received
            let token = response.data.token;
            let user = response.data.user;
            // Security values
            let studyKey = response.data.user.studyKey;
            let salt = response.data.user.salt;
            let iv = response.data.user.iv;

            let peerGroupId = response.data.allUserData.peerGroupId;
            let regionID = response.data.allUserData.regionID;

            let decryptedKey = decryptKeyCBC(password.value, studyKey, iv, salt);
            setLoading(false);

            setUserSession(token, user, password.value, decryptedKey, iv, salt, peerGroupId, regionID);
            loadData(token);

            let storedPeerGroupId = localStorage.getItem("lastSelectedPeerGroup");
            let storedRegionId = localStorage.getItem("storedRegionId");

            if (!localStorage.getItem("lastSelectedPeerGroup")) {
                fetchPeerGroup(storedPeerGroupId).then(r => console.log(r));
                fetchRegionById(storedRegionId).then(r => console.log(r));
            } else {
                fetchPeerGroup(storedPeerGroupId).then(r => console.log(r));
                fetchRegionById(storedRegionId).then(r => console.log(r));
            }

            // participantBreakdown(token);
            //range(token);

            props.history.push('/dashboard');
        }).catch(error => {
            if (error.response) {
                setErrorMsg(<div>
                    {(
                        <div className="alert alert-danger" role="alert">
                            {error.response.data.message}
                        </div>
                    )}</div>)

            }
            username.setValue = ''
            password.setValue = '';
            setLoading(false);
            console.log(error)
        });
    }

    return (

        <div className='container-fluid'
             style={{
                 // todo - change the background
                 backgroundImage: "url(" + "https://raw.githubusercontent.com/sahracton/randomStuf/main/Background.png" + ")",
                 width: "100%",
                 height: "100%"
             }}>
            <div className='row'>
                <div className='col-md-6'>
                    <div style={{paddingBottom: "12%"}}></div>
                    <img
                        className='w-50 mx-auto d-block mt-5'
                        style={{
                            height: "127.07px",
                            width: "139.65px",
                        }}
                        src={PeerformanceLogo}
                        alt='Peerformance Logo'
                    />

                    <div style={{paddingBottom: "1%"}}></div>

                    <div className='col-md-10 col-sm-12 mx-auto'>
                        <br/>
                        <form className="w-100" noValidate style={{
                            paddingLeft: "15%",
                            paddingRight: "15%",
                        }}>
                            <div className="row mt-3">
                                <div className="group-input p-3" style={{
                                    backgroundColor: "#313B65",
                                    border: "solid 15px #313B65",
                                    borderRadius: "10px"
                                }}>

                                    {errorMsg}


                                    <div className="group-input mt-3">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="text" {...username} className="form-control  mt-2"
                                               style={{
                                                   backgroundColor: "#192141",
                                                   borderColor: "#192141",
                                                   color: "#FFFFFF"
                                               }}
                                               aria-describedby="emailHelp" placeholder="  Enter your email address"/>
                                    </div>

                                    {/* new pwd */}
                                    <br/>
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <div className="input-group mb-3">

                                        <input {...password}
                                               type={isRevealPwd ? "text" : "password"}
                                               style={{
                                                   backgroundColor: "#192141",
                                                   borderColor: "#192141",
                                                   color: "#FFFFFF"
                                               }}
                                               className="form-control"
                                               placeholder="  ************"
                                               aria-label="Password"
                                               aria-describedby="basic-addon2"/>

                                        <div className="input-group-append">
                                            <span className="input-group-text" id="basic-addon2"
                                                  style={{
                                                      backgroundColor: "#192141",
                                                      borderColor: "#192141",
                                                  }}>
                                                 <img
                                                     title={isRevealPwd ? "Hide password" : "Show password"}
                                                     style={{width: "17px", height: "24px"}}
                                                     src={isRevealPwd ? eye_off : eye_on}
                                                     onClick={() => setIsRevealPwd(prevState => !prevState)}
                                                 />
                                            </span>
                                        </div>
                                    </div>
                                    {/*end */}
                                    <small style={{display: 'flex', justifyContent: 'flex-end'}}>
                                        Forgot Password
                                    </small>
                                    <br/>

                                    <div className='text-center d-grid gap-4'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary text-center'
                                            value={loading ? 'Loading...' : 'Login'}
                                            onClick={handleLogin}
                                            disabled={loading}
                                            style={{backgroundColor: "#4368F6"}}
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                    <br/>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                               id="flexCheckDefault"
                                               style={{
                                                   height: "20px",
                                                   width: "20px",
                                                   borderColor: "#5E6891",
                                                   backgroundColor: "#313B65"
                                               }}/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault"
                                               style={{color: "#A8B0D1", paddingLeft: "1.2vh",}}>
                                            Remember me
                                        </label>
                                    </div>
                                    <br/>
                                    <div
                                        style={{
                                            colour: "black",
                                            backgroundColor: "black",
                                            height: "0.2px",
                                            left: "100%",
                                            margin: "2px -32px 20px",
                                        }}
                                    >
                                    </div>

                                    <div style={{alignContent: "center", textAlign: "center"}}>
                                        <p>Don't have any account?
                                            <small
                                                style={{fontSize: "15.5px", color: peerformanceBabyBlue}}>
                                                <a style={{textDecoration: "none"}} href="/signup"> Create Account</a>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='col-md-6' style={{backgroundColor: '#313B65'}}>
                    <div class=" container justify-content-md-center"
                         style={{
                             width: "100%",
                             paddingTop: "8%",
                             left: "900px",
                             paddingLeft: "10%",
                             right: "298px",
                             height: "100vh"
                         }}>
                        <p style={{
                            paddingTop: "27.59%",
                            paddingBottom: "5%",
                            lineHeight: "150%",
                            width: "600px",
                            color: "white",
                            fontSize: "38px"
                        }}>
                            Operate a more efficient and profitable business
                        </p>


                        <img src={greenTick} style={{width: "2.5%",}}
                             alt=""/>
                        <p style={{color: "#A5ACCB", marginTop: "-25px", paddingLeft: "3vh", paddingBottom: "1vh"}}>
                            Track your performance against the competition each month
                        </p>

                        <img src={greenTick} style={{width: "2.5%"}}/>

                        <p style={{
                            color: "#A5ACCB",
                            marginTop: "-25px",
                            paddingLeft: "3vh",
                            width: "550px",
                            paddingBottom: "1vh"
                        }}>
                            Join peer studies anonymously without your data being revealed to anyone, including
                            Peerformance
                        </p>


                        <img src={greenTick} style={{width: "2.5%",}} alt=""/>
                        <p style={{color: "#A5ACCB", marginTop: "-25px", paddingLeft: "3vh"}}>
                            Unlock your encrypted results with your private key which only you hold
                        </p>
                        <p style={{
                            color: "#38D982",
                            paddingTop: "4.07%",
                            width: "550px",
                            lineHeight: "150%",
                            fontSize: "32px"
                        }}>
                            See your business performance like never before
                        </p>
                    </div>
                </div>
            </div>

            <CookieConsent enableDeclineButton flipButtons
                           onAccept={(acceptedByScrolling) => {
                               if (acceptedByScrolling) {
                               }
                           }}
                           onDecline={() => {
                               alert("nay!");
                           }}
            >
                This website uses cookies to enhance the user experience.{" "}
                <span style={{fontSize: "10px"}}>This bit of text is smaller :O</span>
            </CookieConsent>
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}
export default Home;

/***/
