import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    getStudyData,
    getStudies,
    updateLastPeerGroup,
    getParticipantBreakdown, updateLastRegion
} from './store/dashboardActions';
// import { getStudyData } from './store/dashboardActions';
import {dashboardActions} from './store/dashboard';
import ActiveStudies from './Dashboard/ActiveStudies'
import AvailableStudies from './Dashboard/AvailableStudies';
import QueuedStudies from './Dashboard/QueuedStudies';

// handle click event of logout button

function LeftSideNav(props) {
    const availableStudies = useSelector(state => state.dashboard.availableStudies);
    const queuedStudies = useSelector(state => state.dashboard.queuedStudies);
    const userSubscriptions = useSelector(state => state.dashboard.userSubscriptions);
    const activeStudy = useSelector(state => state.dashboard.activeStudy);
    const dispatch = useDispatch();


    const handlingStudyClick = study => {
        dispatch(dashboardActions.setActiveStudy(study));
        const isSubscriber = userSubscriptions.some(subscription => subscription.StudyID === study.ID);
        if (isSubscriber) {
            dispatch(getStudyData(study.ID));
            dispatch(getParticipantBreakdown(study?.ID))
        } else {
            dispatch(dashboardActions.setStudyData(null));
        }
    };

    const onActiveStudyClick = subscription => {
        dispatch(getStudies(subscription?.PeerGroupID, subscription?.RegionID, subscription?.StudyID));
        dispatch(updateLastPeerGroup(subscription?.PeerGroupID));
        dispatch(getParticipantBreakdown(subscription?.StudyID))
        sessionStorage.setItem("regionId", subscription?.RegionID);
        dispatch(updateLastRegion(subscription?.RegionID));
    }

    return (
        <div style={{marginLeft: "13px"}}>
            <ActiveStudies
                activeStudies={userSubscriptions}
                activeStudy={activeStudy}
                onActiveStudyClick={onActiveStudyClick}
            />
            <AvailableStudies
                activeStudy={activeStudy}
                availableStudies={availableStudies}
                userSubscriptions={userSubscriptions}
                onStudyClick={handlingStudyClick}
            />
            <br/>

            <QueuedStudies
                activeStudy={activeStudy}
                queuedStudies={queuedStudies}
                userSubscriptions={userSubscriptions}
                onStudyClick={handlingStudyClick}
            />

        </div>
    );
}

export default LeftSideNav;
