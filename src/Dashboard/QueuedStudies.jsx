import React from 'react'
import bookWithPlusIcon from '../Styleguide/Page-1.svg';
import copyIcon from '../Styleguide/icons/copy.svg';
import check from '../Styleguide/icons/check.svg';


const QueuedStudies = ({activeStudy, queuedStudies, userSubscriptions, onStudyClick}) => {
    let element = document.getElementById("participant_breakdown");
    return (
        <div className="queued-studies-nav" >
            <div className="container-fluid">
                <p style={{ marginLeft: " 2.5%" }}>
                    <img src={copyIcon} style={{ marginLeft: " -8%", marginRight: "10px" }} alt="" />
                    QUEUED STUDIES ({queuedStudies.length})
                    <img src={bookWithPlusIcon} className="float-end card book-with-plus-icon" alt="" />
                </p>
                <div className='studies-horizontal-line' />
                <div className="studies-container">
                    {queuedStudies.map(study => <div className={activeStudy?.ID === study.ID ? 'active' : null} onClick={() => onStudyClick(study)}>
                        <img style={{ visibility: userSubscriptions.some(sub => study?.ID === sub?.StudyID) ? 'visible' : 'hidden' }} src={check} alt="check-icon" />
                        <span style={{ marginLeft: '10px' }}>
                            {study.Name}
                        </span>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default QueuedStudies
