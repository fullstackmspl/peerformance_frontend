import axios from 'axios';

let _ = require('lodash');
let url = `/quicklink`;

let localStorageQuicklink;

function getQuickLinks() {
	axios
		.get(url)
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


export default getQuickLinks;
