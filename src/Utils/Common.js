// set the token and user from the session storage
export const setUserSession = (token, user, pwd, decryptedKey, iv, salt, peerGroupId, regionID) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('password', pwd);
    sessionStorage.setItem('decryptedKey', decryptedKey);
    sessionStorage.setItem('iv', iv);
    sessionStorage.setItem('salt', salt);

    sessionStorage.setItem('peerGroupId', peerGroupId);
    sessionStorage.setItem('regionId', regionID);
}

// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getPassword = () => {
    return sessionStorage.getItem('password') || null;
}

export const getDecryptedKey = () => {
    return sessionStorage.getItem('decryptedKey') || null;
}

export const getIV = () => {
    return sessionStorage.getItem('iv') || null;
}

export const getSalt = () => {
    return sessionStorage.getItem('salt') || null;
}

export const getPeerGroupSession = () => {
    return sessionStorage.getItem('peerGroupId') || null;
}

export const getRegionSession = () => {
    return sessionStorage.getItem('regionId') || null;
}

export const getLevel4 = () => {
    return sessionStorage.getItem('fetchedLevel4') || null;
}

export const getLevel6 = () => {
    return sessionStorage.getItem('fetchedLevel6') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('decryptedKey');
    sessionStorage.removeItem('iv');
    sessionStorage.removeItem('salt');

    sessionStorage.removeItem('fetchedLevel4');
    sessionStorage.removeItem('fetchedLevel4SIC');
    sessionStorage.removeItem('fetchedLevel6');
    sessionStorage.removeItem('fetchedLevel6SIC');
    sessionStorage.removeItem('peerGroupId');
    sessionStorage.removeItem('regionId');
    sessionStorage.removeItem('regionName');
    sessionStorage.removeItem('userIsLoggedIn');
    sessionStorage.removeItem('userSubscription');

    // Local storage
    // localStorage.removeItem("regions");
    // localStorage.removeItem("top3Regions");
    // localStorage.removeItem("quickLinks");
}
