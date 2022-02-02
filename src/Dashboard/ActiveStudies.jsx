import React from 'react'
import {peerformanceTextBabyBlue} from "../colours";
import openBookIcon from '../Styleguide/book-open.svg';
import rightArrowIcon from '../Styleguide/icons/chevron-right.svg';


const ActiveStudies = ({ activeStudies, activeStudy, onActiveStudyClick}) => {
    return (
        <div className="active-studies-nav">
            <div className="container-fluid">
                <p>
                    <img className="open-book-icon" src={openBookIcon} alt=""/>
                    ACTIVE STUDIES ({activeStudies?.length})
                </p>
                <hr/>
                <div className="active-studies-container">
                    {activeStudies?.map(actStudy =>
                        <div className="row active-studies-row"
                             onClick={() => onActiveStudyClick(actStudy)}
                             style={{color: actStudy.StudyID === activeStudy?.ID ? '#38d881' : peerformanceTextBabyBlue}}>
                            <div className="col-sm-1">
                                {actStudy.StudyID === activeStudy?.ID ?
                                    <img src={rightArrowIcon} style={{marginRight: '', marginTop: '4px'}}
                                         className='float-end' alt=""/>
                                    : null}
                            </div>
                            <div style={{paddingLeft: 0}}
                                 className="col-sm-10 col-md-10 col-lg-10 col-xl-10 text-elipsed">{actStudy?.Name}
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default ActiveStudies
