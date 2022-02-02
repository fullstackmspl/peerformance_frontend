import React, {useState} from 'react';
import roundedArrow from '../Styleguide/icons/rounded-arrow.svg';
import greenCheck from '../Styleguide/icons/green-check.svg';
import leftArrow from '../Styleguide/icons/left-arrow.svg';
import crossIcon from '../Styleguide/x.svg';

 const AddDataEfficiencyType = ({handleClose, addData}) => {

    const [productValue, setProductValue] = useState(0);
    const [producerValue, setProducerValue] = useState(0);

    const validateProductValue = value => {
        if(!isNaN(value)) {
            setProductValue(value);
        }
    }

    const validateProducerValue = value => {
        if(!isNaN(value)) {
            setProducerValue(value);
        }
    }

    const submissionValue = producerValue && productValue ? (productValue/producerValue).toFixed(2) : '';


    const addEfficiencyData = e => {
        e.preventDefault();
        addData(submissionValue);
    };

    return (
        <form noValidate onSubmit={addEfficiencyData}>
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
                <div className="add-data-popup-content">
                    <div className="add-data-popup-content-label">
                        <span>Product</span>
                        <span className="add-data-popup-content-label-right">Efficiency</span>
                    </div>
                    <input
                        className='form-control mt-2'
                        type='text'
                        id='product-id'
                        name='product'
                        value={productValue ? productValue : ''}
                        onChange={e => validateProductValue(e.target.value)}
                        required
                    />
                    <div className="add-data-popup-content-label mt-3">
                        <span>Producer</span>
                    </div>
                    <input
                        className='form-control mt-2'
                        type='text'
                        id='producer-id'
                        name='producer'
                        value={producerValue ? producerValue : ''}
                        onChange={e => validateProducerValue(e.target.value)}
                        required
                    />
                    <span className="red-message">Figures entered above will not be shared with Peerformance </span>
                    <div className="buttons-row">
                        <button className="add-data-submit-btn" disabled={!submissionValue}>
                            <img src={roundedArrow} alt="rounded-arrow" /> <span>Add to Submission</span>
                        </button>
                        <div className="add-data-counter">{submissionValue}</div>
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

export default AddDataEfficiencyType;