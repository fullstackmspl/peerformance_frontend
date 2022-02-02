import React from 'react'

const TermConditionRow = ({ title, content }) => {
    return (
        <div className="mb-4">
            <div>
                <span className="term-title">{title}</span>
            </div>
            <div>
                <span className="popup-text">
                    {content}
                </span>

            </div>
        </div>
    )
}

export default TermConditionRow
