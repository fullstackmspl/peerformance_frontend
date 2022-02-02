import React from 'react'
import ribbon from '../Styleguide/icons/ribbon.svg';
import searchIcon from '../Styleguide/search_icon.svg';
import check from '../Styleguide/icons/check.svg';


const AvailableStudies = ({activeStudy, availableStudies, userSubscriptions, onStudyClick}) => {
    return (
        <div className="available-studies-nav">
            <div style={{ paddingRight: '6px' }} className="container-fluid">
                <p style={{ marginLeft: " 2.5%" }}>
                    <img src={ribbon} style={{ marginLeft: " -8%", marginRight: "10px" }} alt="" />
                    AVAILABLE STUDIES ({availableStudies.length})

                    <img src={searchIcon} className="float-end card search-icon" alt="" />
                </p>
                <div className='studies-horizontal-line' />
                <div className="studies-container">
                    {availableStudies.map(study => <div className={activeStudy?.ID === study.ID ? 'active' : null} onClick={() => onStudyClick(study)}>
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

export default AvailableStudies
