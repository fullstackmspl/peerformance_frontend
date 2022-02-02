import React from 'react'

const ProgressBarComponent = ({value = 0, id}) => {


    return (
        <div id={id} className={`progress-bar-container ${value < 0 && 'negative'}`}>
            <div className="progress-bar-component" style={{width: `${Math.abs(value)}%`}}/>
        </div>
    )
}

export default ProgressBarComponent
