import React, {useState} from 'react';
import roundedArrow from '../Styleguide/icons/rounded-arrow.svg';
import greenCheck from '../Styleguide/icons/green-check.svg';
import leftArrow from '../Styleguide/icons/left-arrow.svg';
import crossIcon from '../Styleguide/x.svg';
import { getMonthName, getCurrentMonth } from '../Utils/dashboard';


 const AddDataPercentageType = ({handleClose, addData}) => {

    const [currentMonthValue, setCurrentMonthValue] = useState(0);
    const [oneMonthAgoValue, setOneMonthAgoValue] = useState(0);
    const [twoMonthAgoValue, setTwoMonthAgoValue] = useState(0);
    const [threeMonthAgoValue, setThreeMonthAgoValue] = useState(0);
    const threeMonthsAverage = (parseFloat(oneMonthAgoValue) + parseFloat(twoMonthAgoValue) + parseFloat(threeMonthAgoValue))/3;
    const submissionValue = currentMonthValue && oneMonthAgoValue && twoMonthAgoValue && threeMonthAgoValue ? ((currentMonthValue - threeMonthsAverage)/threeMonthsAverage * 100).toFixed(2) : '';

    const validateValue = (value, setValue) => {
        if(!isNaN(value)) {
            setValue(value);
        }
    }

    const addPercentageData = e => {
        e.preventDefault();
        addData(submissionValue);
    }

    return (
        <form noValidate onSubmit={addPercentageData}>
            <div className="add-data-popup-container">
                <div className="add-data-popup-header">
                    <div className="add-data-popup-header-left">
                        <div>
                            <span className='title'>Result Calculator</span>
                            <span className='description'>Calculate a percentage applied to the users data submission</span>
                        </div>
                    </div>
                    <div>
                        <img src={crossIcon} alt="x" className="cross" onClick={handleClose} />
                    </div>
                </div>
                <div className="add-data-popup-content-third-type">
                    <div className="group-inputs-row">
                        <div style={{ width: '45%' }}>
                            <div className="add-data-popup-content-label">
                                <span>{getMonthName(getCurrentMonth(0))}</span>
                                <span className="add-data-popup-content-label-right">Current Month</span>
                            </div>
                            <input
                                className='form-control mt-2'
                                type='text'
                                id='currentMonth'
                                name='currentMonth'
                                value={currentMonthValue ? currentMonthValue : ''}
                                onChange={e => validateValue(e.target.value, setCurrentMonthValue)}
                                required
                            />
                        </div>
                        <div style={{ width: '45%' }}>
                            <div className="add-data-popup-content-label">
                                <span>{getMonthName(getCurrentMonth(2))}</span>
                            </div>
                            <input
                                className='form-control mt-2'
                                type='text'
                                id='twoMonthAgo'
                                name='twoMonthAgo'
                                value={twoMonthAgoValue ? twoMonthAgoValue : ''}
                                onChange={e => validateValue(e.target.value, setTwoMonthAgoValue)}
                                required
                            />
                        </div>

                    </div>

                    <div className="group-inputs-row mt-3">
                        <div style={{ width: '45%' }}>
                            <div className="add-data-popup-content-label">
                                <span>{getMonthName(getCurrentMonth(1))}</span>
                            </div>
                            <input
                                className='form-control mt-2'
                                type='text'
                                id='oneMonthAgo'
                                name='oneMonthAgo'
                                value={oneMonthAgoValue ? oneMonthAgoValue : ''}
                                onChange={e => validateValue(e.target.value, setOneMonthAgoValue)}
                                required
                            />
                        </div>
                        <div style={{ width: '45%' }}>
                            <div className="add-data-popup-content-label">
                                <span>{getMonthName(getCurrentMonth(3))}</span>
                            </div>
                            <input
                                className='form-control mt-2'
                                type='text'
                                id='threeMonthAgo'
                                name='threeMonthAgo'
                                value={threeMonthAgoValue ? threeMonthAgoValue : ''}
                                onChange={e => validateValue(e.target.value, setThreeMonthAgoValue)}
                                required
                            />
                        </div>

                    </div>

                    <span className="red-message">Figures entered above will not be shared with Peerformance </span>
                    <div className="buttons-row">
                        <button className="add-data-submit-btn" type='submit' disabled={!submissionValue}>
                            <img src={roundedArrow} alt="rounded-arrow" /> <span>Add to Submission</span>
                        </button>
                        <div className="add-data-counter">{submissionValue ? `${submissionValue}%` : ''}</div>
                    </div>
                    <div className="add-data-footer">
                        <img src={greenCheck} alt="check" />
                        <span>Save date on device for future use</span>
                    </div>
                </div>
            </div>
        </form>
        
    );
}

export default AddDataPercentageType;