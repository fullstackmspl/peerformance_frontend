import axios from 'axios';

let _ = require('lodash');
//let url = `/getparticipantbreakdown`;
let url = `/participantbreakdowndata`;

function participantBreakdown() {
    axios
        .get(url)
        .then(function (response) {
            // handle success
            console.log("This is the response from the server",response)
            window.localStorage.removeItem('breakdown');
            let participantBreakdownRange = JSON.stringify(response.data.breakdown);
            window.localStorage.setItem('breakdown', participantBreakdownRange);
            JSON.parse(localStorage.getItem('breakdown')); // we can return this
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

}

export default participantBreakdown;