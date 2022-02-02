import React, { useState } from "react";
import { getMonthName, getCurrentMonth } from '../Utils/dashboard';
import roundedArrow from '../Styleguide/icons/rounded-arrow.svg';
import greenCheck from '../Styleguide/icons/green-check.svg';
import leftArrow from '../Styleguide/icons/left-arrow.svg';
import crossIcon from '../Styleguide/x.svg';

 const AddDataAbsoluteNumberType = ({handleClose, addData}) => {
    const [submissionValue, setSubmissionValue] = useState(0);

    const submittedValue = submissionValue ? parseFloat(submissionValue).toFixed(2) : null;

    const validateValue = (value, setValue) => {
        if(!isNaN(value)) {
            setValue(value);
        }
    };

    const addAbsoluteData = e => {
        e.preventDefault();
        addData(submittedValue);
    };

     return (
         <form noValidate onSubmit={addAbsoluteData}>
             <div className="add-data-popup-container">
                 <div className="add-data-popup-header">
                     <div className="add-data-popup-header-left">
                         <div>
                             <span className='title'>Result Calculator</span>
                             <span className='description'>
                                 Calculate a percentage applied to the users data submission</span>
                         </div>
                     </div>
                     <div>
                         <img src={crossIcon} alt="x" className="cross" onClick={handleClose} />
                     </div>
                 </div>
                 <div className="add-data-popup-content">
                     <div className="add-data-popup-content-label">
                         <span>{getMonthName(getCurrentMonth())}</span>
                         <span className="add-data-popup-content-label-right">Absolute number</span>
                     </div>
                     <input
                         className='form-control mt-2'
                         type='text'
                         id='submissionValue'
                         name='submissionValue'
                         value={submissionValue ? submissionValue : ''}
                         onChange={e => validateValue(e.target.value, setSubmissionValue)}
                         required
                     />
                     <span className="red-message">Figures entered above will not be shared with Peerformance </span>
                     <div className="buttons-row">
                         <button className="add-data-submit-btn" disabled={!submittedValue}>
                             <img src={roundedArrow} alt="rounded-arrow" /> <span>Add to Submission</span>
                         </button>
                         <div className="add-data-counter">{submittedValue}</div>
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

export default AddDataAbsoluteNumberType;