import axios from 'axios';

let _ = require('lodash');
let url = `/quicklink`;

let localStorageQuicklink;


function getQuickLinks(token) {
    axios
        .get(url,
            {
            headers: {
                'authorization': token
            }
        })
        .then(function (response) {
            // handle success
            // console.log(fetchedData)
            window.localStorage.removeItem('quickLinks');
            let quickLinks = JSON.stringify(response.data.quickLinks);
            window.localStorage.setItem('quickLinks', quickLinks);

            localStorageQuicklink = JSON.parse(localStorage.getItem('quickLinks')); // we can return this
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

}
function loadData(token) {

    // Get QuickLinks
    getQuickLinks(token);

    // fetch time
    let localStorageTime = JSON.parse(localStorage.getItem('categoryTime'));
    let fetchedObject = JSON.parse(localStorage.getItem('categories'));

    let url = `/studygroups`;
    if (fetchedObject !== null && fetchedObject !== undefined) {
        url = `/studygroups?time=` + localStorageTime;
    }
    console.log(url);
    axios
        .get(url)
        .then(function (response) {
            // handle success
            if (response.data.status === 'new') {
                // removing the old entries from local storage
                console.log('new entries received');
                window.localStorage.removeItem('categoryTime');
                window.localStorage.removeItem('categories');

                let categories = JSON.stringify(response.data.categories);
                let categoryTime = JSON.stringify(response.data.time);
                categories = categories.replace(/\\r/g, '');

                window.localStorage.setItem('categoryTime', categoryTime);
                window.localStorage.setItem('categories', categories);
                localStorageTime = JSON.parse(localStorage.getItem('categoryTime'));
                fetchedObject = JSON.parse(localStorage.getItem('categories'));
                window.location.reload();
            } else {
                // do nothing
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    return fetchedObject;
}

export default loadData;
