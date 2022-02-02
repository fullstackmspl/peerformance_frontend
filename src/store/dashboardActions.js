import {dashboardActions} from './dashboard';
import {
    fetchRegions,
    fetchUserInfo,
    fetchUserSubscriptions,
    addSubscription,
    updatePeerGroup,
    fetchAddStudyData,
    fetchGetStudyData,
    fetchTop3Level,
    fetchRegionChild,
    fetchParticipantBreakDown,
    fetchStudyByRegion,
    updateRegion, fetchRegionById, fetchPeerGroup
} from './dashboardFetches';


// participant breakdown data
export const getParticipantBreakdown = (studyId) => {
    return async (dispatch, getState) => {
        const participantBreakdown = await fetchParticipantBreakDown(studyId);
        dispatch(dashboardActions.setParticipantBreakDown(participantBreakdown));
    };
};

export const getStudies = (peerGroupID, regionID, studyId = undefined) => {
    return async (dispatch) => {
        let studies = await fetchStudyByRegion(peerGroupID, regionID);
        dispatch(dashboardActions.groupStudies({studies, studyId}));
        const availableStudies = studies.filter(study => study.Status === 1);
        if (availableStudies.length && !studyId) {
            dispatch(getStudyData(availableStudies[0].ID));
            dispatch(getParticipantBreakdown(availableStudies[0].ID));

        } else if (availableStudies.length && studyId) {
            dispatch(getStudyData(studyId));
        }
    };
};

// Get top 3 levels
export const getTop3Regions = () => {
    return async dispatch => {
        const top3regions = await fetchTop3Level();
        dispatch(dashboardActions.setTop3Regions(top3regions));
    };
};

// Get region child
export const getRegionChildren = parent => {
    return async dispatch => {
        const regionChildren = await fetchRegionChild(parent);
        dispatch(dashboardActions.setRegionChildren(regionChildren));
    };
};

// Get region child
export const getCityChildren = parent => {
    return async dispatch => {
        const regionChildren = await fetchRegionChild(parent);
        dispatch(dashboardActions.setCityChildren(regionChildren));
    };
};

// Get all regions
export const getRegions = () => {
    return async dispatch => {
        const regions = await fetchRegions();
        dispatch(dashboardActions.setRegions(regions));
    };
};

export const updateLastRegion = (regionID) => {
    return async (dispatch) => {
        const region = await updateRegion(regionID);
    };
};

export const updateLastPeerGroup = (id) => {
    return async (dispatch) => {
        const studies = await updatePeerGroup(id);
    };
};

export const getRegionById = (id) => {
    return async dispatch => {
        let regionById = fetchRegionById(id);
        dispatch(dashboardActions.setLastRegionSelected(regionById));
    };
};

export const getUserInfo = () => {
    return async dispatch => {
        const userInfo = await fetchUserInfo();
        let regionById;
        let peerGroupById;
        dispatch(dashboardActions.setUserInfo(userInfo));
        if (userInfo && userInfo.Peer_Group_ID) {
            //Setting the region id extracted from the backend/db
            if (userInfo.RegionID) {
                getRegionById(userInfo.RegionID)

                localStorage.setItem("storedRegionId", userInfo.RegionID);

                // Setting region
                regionById = fetchRegionById(userInfo.RegionID);
                dispatch(dashboardActions.setLastRegionSelected(regionById));

            }
            // getting the region id from session storage
            let regionId = sessionStorage.getItem("regionId");
            dispatch(getStudies(userInfo.Peer_Group_ID, regionId));

            // Set the peer group that the user last selected
            localStorage.setItem("lastSelectedPeerGroup", userInfo.Peer_Group_ID)

            peerGroupById = fetchPeerGroup(userInfo.Peer_Group_ID);
            dispatch(dashboardActions.setLastPeerGroupSelected4Or5(peerGroupById));
        }
    };
};

export const getUserSubscriptions = () => {
    return async (dispatch, getState) => {
        const userSubscriptions = await fetchUserSubscriptions();
        dispatch(dashboardActions.setUserSubscriptions(userSubscriptions));
    };
};

export const subscribeStudy = (studyId) => {
    return async (dispatch, getState) => {
        const userSubscriptions = await addSubscription(studyId);
        dispatch(getUserSubscriptions());
    };
};

export const addStudyData = (value, studyId) => {
    return async (dispatch, getState) => {
        console.log(`value---fetch`, value);
        const addDataResult = await fetchAddStudyData(value, studyId);
    };
};

export const getStudyData = studyId => {
    return async (dispatch) => {
        const studyData = await fetchGetStudyData(studyId);
        dispatch(dashboardActions.setStudyData(studyData));
    };
};