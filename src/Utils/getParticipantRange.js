import axios from 'axios';

let _ = require('lodash');
let url = `/getrange`;

function getRange() {
    axios
        .get(url)
        .then(function (response) {
            // handle success
            console.log("This is the response from the server",response)
            window.localStorage.removeItem('range');
            let participantBreakdownRange = JSON.stringify(response.data.range);
            window.localStorage.setItem('range', participantBreakdownRange);
            JSON.parse(localStorage.getItem('range')); // we can return this
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

}

export default getRange;