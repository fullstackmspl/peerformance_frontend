import axios from 'axios';
import {FaJediOrder} from "react-icons/all";

export const fetchRegions = async () => {
    try {
        const response = await axios.get('/regions',
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        console.log("This is what we received" + response.data);
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const fetchRegionChild = async parent => {
    try {
        const response = await axios.get(`/regions/${parent}/datapoint`,
            // const response = await axios.get(`/regions/2/datapoint`,
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        console.log("This is the result 2:" + response.data)

        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

// Get the first three regions - All of UK, Europe, Global,
export const fetchTop3Level = async () => {
    try {
        const response = await axios.get('/regions/top3',
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });

        // set the top 3 levels
        window.localStorage.setItem("top3Regions", JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const fetchUserInfo = async () => {
    try {
        const response = await axios.get('/users/info',
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        // we are setting a variable that the user has logged in
        sessionStorage.setItem("userIsLoggedIn", "true");
        console.log("response.data" + JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

// Get region by id - studyID, regionId
export const fetchStudyByRegion = async (peerGroupId, regionId) => {
    try {
        //let response = await axios.get(`/studies/16775/1`,
        let response = await axios.get(`/studies/${peerGroupId}/${regionId}`,
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });

        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const fetchStudies = async (peerGroupId) => {
    try {
        const response = await axios.get(`/studies/${peerGroupId}`,
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });

        console.log("This is the peer group id :", peerGroupId)
        console.log("This is the study:", response.data)
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

//
export const fetchUserSubscriptions = async (id) => {
    try {
        const response = await axios.get("/users/subscriptions",
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        console.log("response.data" + JSON.stringify(response.data));
        sessionStorage.setItem("userSubscription", JSON.stringify(response.data));
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const addSubscription = async (id) => {
    try {
        const response = await axios.post("/users/subscriptions",
            {
                studyId: id
            },
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const fetchAddStudyData = async (value, studyId) => {
    try {
        const response = await axios.post(`/studydata/${studyId}/datapoint`,
            {
                encryptedValue: value,
                value: value
            },
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const fetchGetStudyData = async studyId => {
    try {
        const response = await axios.get(`/studydata/${studyId}/datapoint`,
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

// Update the sql user table with the user's last region
export const updateRegion = async (regionID) => {
    try {
        const response = await axios.put("/users/region",
            {
                regionID: regionID
            },
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

// Update the sql user table with the user's last selected peer group
export const updatePeerGroup = async (id) => {
    try {
        const response = await axios.put("/users/peergroup",
            {
                peerGroupId: id
            },
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const fetchRegionById = async regionId => {
    try {
        const response = await axios.get(`/regions/${regionId}`,
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });

        sessionStorage.setItem("regionId", response.data[0].ID);
        sessionStorage.setItem("regionName", response.data[0].Name);
        sessionStorage.setItem("userIsLoggedIn", "true");

        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

export const fetchPeerGroup = async peerGroupId => {
    try {
        const response = await axios.get(`/peergroup/${peerGroupId}`,
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        sessionStorage.setItem("fetchedLevel4", response.data[0].Category); // fine
        sessionStorage.setItem("fetchedLevel6", response.data[1].Category); // fine

        sessionStorage.setItem("fetchedLevel4SIC", response.data[0].sic); // fine
        sessionStorage.setItem("fetchedLevel6SIC", response.data[1].sic); // fine
        sessionStorage.setItem("userIsLoggedIn", "true");
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

// Participant range data
export const fetchParticipantRange = async () => {
    try {
        const response = await axios.get("/getrange",
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};

// Participant get participant breakdown data
export const fetchParticipantBreakDown = async (studyId) => {
    try {
        // :studyID/datapoint
        const response = await axios.get(`/participantbreakdowndata/${studyId}/datapoint`,
            {
                headers: {
                    'authorization': sessionStorage.getItem('token')
                }
            });
        sessionStorage.setItem("breakDown", response.data);
        return response.data;
    } catch (err) {
        console.log(`error`, err);
        return [];
    }
};
