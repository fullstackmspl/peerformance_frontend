import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: '',
    lastRegionSelected: '',
    selectedPeerGroup: '',
    regions: [],
    userInfo: undefined,
    userSubscriptions: [],
    availableStudies: [],
    queuedStudies: [],
    allStudies: [],
    studyData: undefined,
    activeStudy: undefined,

    // Participant breakdown
    participantBreakDown: [],

    // Top 3 regions
    top3Regions: [],

    // Region child
    regionChildren: [],

    // Region child
    citesChildren: [],

    // study Data By Region
    studyDataByRegion: [],

    lastPeerGroupSelected4Or5: '',

    lastPeerGroupSelected6: '',

};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        setLastRegionSelected(state, action) {
            state.lastRegionSelected = action.payload;
        },

        setUser(state, action) {
            state.user = action.payload;
        },
        setRegions(state, action) {
            state.regions = action.payload;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },

        groupStudies(state, action) {
            const {studies, studyId} = action.payload;
            studies.sort((a, b) => b.NumOfSubscribers - a.NumOfSubscribers);

            const availableStudies = studies.filter(study => study.Status === 1);
            const queuedStudies = studies.filter(study => study.Status === 0);

            state.availableStudies = availableStudies;
            state.queuedStudies = queuedStudies;
            state.allStudies = studies;

            // Todo  check this code
            if (availableStudies.length && !studyId) {
                state.activeStudy = availableStudies[0];

            } else if (availableStudies.length && studyId) {
                state.activeStudy = availableStudies.find(study => study.ID === studyId);
            } else {
                state.activeStudy = null;
            }
        },

        setUserSubscriptions(state, action) {
            const subscriptions = action.payload;
            state.userSubscriptions = subscriptions;
        },
        setStudyData(state, action) {
            state.studyData = action.payload;
        },
        setActiveStudy(state, action) {
            state.activeStudy = action.payload;
        },

        //  Participant breakdown
        setParticipantBreakDown(state, action) {
            state.participantBreakDown = action.payload;
        },

        //  top 3 regions
        setTop3Regions(state, action) {
            state.top3Regions = action.payload;
        },

        // Set the region Children
        setRegionChildren(state, action) {
            state.regionChildren = action.payload;
        },

        // Set the region Children
        setCityChildren(state, action) {
            state.citesChildren = action.payload;
        },

        // study Data By Region
        studyDataByRegion(state, action) {
            state.top3Regions = action.payload;
        },

        // study Data By Region
        setLastPeerGroupSelected4Or5(state, action) {
            state.lastPeerGroupSelected4Or5 = action.payload;
        },
        // study Data By Region
        setLastPeerGroupSelected6(state, action) {
            state.lastPeerGroupSelected6 = action.payload;
        }

    }
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;