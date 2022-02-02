import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { addStudyData, getStudyData } from './store/dashboardActions';
import {encryptKey} from './Utils/Encryption';
import {getDecryptedKey, getIV, getUser} from './Utils/Common';
import {decryptDataCTR} from './Utils/DecryptDataCTR';
import plusSign from "./Styleguide/plus-symbol.svg"
import AddDataAbsoluteNumberType from './Dashboard/AddDataAbsoluteNumberType';
import AddDataEfficiencyType from './Dashboard/AddDataEfficiencyType';
import AddDataPercentageType from './Dashboard/AddDataPercentageType';

// import {Button, Modal} from 'react-bootstrap';

const AddDataPopUp = ({ type }) => {
    const dispatch = useDispatch();
    const activeStudy = useSelector(state => state.dashboard.activeStudy);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const addData = (value) => {
        dispatch(addStudyData(value, activeStudy.ID));
        dispatch(getStudyData(activeStudy.ID));
        handleClose();
    }

    const renderPopupContentDependsOnStudyType = () => {
        switch(type) {
            case 1:
                return <AddDataPercentageType handleClose={handleClose} addData={addData} />;
            case 2: 
                return <AddDataEfficiencyType handleClose={handleClose} addData={addData} />;
            case 3: 
                return <AddDataAbsoluteNumberType handleClose={handleClose} addData={addData} />;
            default:
                return null;
        }
    }

    return (
        
            <div className='input-group-sm mb-3  float-end'>
                <Button variant='' onClick={handleShow} style={{
                    backgroundColor: '#38d881',
                    paddingTop: "8%",
                    paddingBottom: "8%",
                    border: "2px solid #38d881",
                    borderRadius: "10px"
                }}>

                    <small style={{
                        fontSize: "16px",
                        paddingRight: "10px",
                        paddingLeft: "10px"
                    }}> <img src={plusSign} alt="" style={{ marginTop: "-4px", marginRight: "5px" }} />Add data</small>
                </Button>


            <Modal className="add-data-popup" size="lg" show={show} onHide={handleClose} animation={false}>
                <Modal.Body>
                    {/* <form noValidate onSubmit={onSubmitForm}> */}
                        {renderPopupContentDependsOnStudyType()}
                    {/* </form> */}
                </Modal.Body>
            </Modal>
            </div>
        
    );
}


export default AddDataPopUp;
