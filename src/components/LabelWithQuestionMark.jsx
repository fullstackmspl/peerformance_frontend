import React, { useState } from 'react'
import questionMarkIcon from '../Styleguide/icons/question-mark.svg';

const LabelWithQuestionMark = ({ name, title, notificationMessage }) => {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className="label-question-mark-container">
            <label htmlFor={name}>{title}</label>
            <img
                className='float-end'
                src={questionMarkIcon}
                alt='question-mark-icon'
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
            />
            {isActive ? <div className="p-2 label-question-mark-notification">
                <span style={{ color: '#192141', fontWeight: 400 }}>
                    {notificationMessage}
                </span>
            </div> : null}
        </div>
    )
}

export default LabelWithQuestionMark
