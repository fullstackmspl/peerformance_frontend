import axios from 'axios';

export const checkAccount = (email) => {
	return axios.post('/checkAccount', {
		email: email,
	});
};

export const signUp = (email, password, firstName, surname) => {
	return axios.post('/signupuser', {
		email,
		password,
		firstName,
		surname,
	});
};

export const checkToken = (token) => {
	return axios.get(`/verifyToken?token=${token}`, {
		token,
	});
};

export const checkAuthToken = (token) => {
	return axios.get(`/verifyAuthToken?token=${token}`, {
		token,
	});
};

export const getSecurityQuestions = () => {
	return axios.get('/securityQuestions');
};

export const getCompanyDictionaries = () => {
	return axios.get('/companyDictionaries');
};

export const createUser = (userData) => {
	return axios.post('/createUser', {
		...userData,
	});
};

export const createCompany = (companyData) => {
	return axios.post('/createCompany', {
		...companyData,
	});
};

export const refreshToken = (email) => {
	return axios.post('/refreshToken', { email });
};

export const refreshAuthToken = (submiterEmail, supervisorEmail) => {
	return axios.post('/refreshAuthToken', { submiterEmail, supervisorEmail });
};
