import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import PeerformanceLogo from '../assets/peerformance_logo.svg';

let validator = require('email-syntax-validator');

function Login(props) {
	const [loading, setLoading] = useState(false);
	const email = useFormInput('');
	const password = useFormInput('');
	const confirmPassword = useFormInput('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	function isValid() {
		let validation = true;
		let input_password1 = password.value;
		let input_password2 = confirmPassword.value;
		setError(null);
		setSuccess(null);

		// First lets check if the user has enter their email
		if (!email.value || email.value === 'undefined') {
			validation = false;
			setLoading(false);
			setError('Please enter your email.');
			console.log(validation);
		} else if (!validator.validate(email.value)) {
			setError('Please enter a valid email.');
			validation = false;
			setLoading(false);
			console.log('Email validation', validator.validate(email.value));
		}

		// Now lets us check that that password's match and that they follow a format
		// checking the first input box
		if (
			!input_password1 ||
			!input_password2 ||
			input_password1 === 'undefined' ||
			input_password2 === 'undefined'
		) {
			validation = false;
			setLoading(false);
			setError('Please enter your desired password.');
			console.log(validation);
		}
		if (input_password1 !== input_password2) {
			validation = false;
			setLoading(false);
			setError('Password did not match');
			console.log(validation);
		}

		return validation;
	}

	// handle button click of login form
	const handleSignup = () => {
		setError(null);
		setLoading(true);

		if (isValid() === true) {
			axios
				.post('/signup', {
					username: email.value,
					password: password.value,
				})
				.then((response) => {
					setLoading(false);
					setSuccess('Your Account has been created successfully!');
					console.log(response);
				})
				.catch((error) => {
					setLoading(false);
					if (error.response.status === 409) {
						setError(error.response.data.message);
					} else {
						setError('Something went wrong. Please try again later.');
					}
				});
		}
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-5 mx-auto'>
					<form className=' novalidate '>
						<img
							className='w-50 mx-auto d-block mt-5'
							src={PeerformanceLogo}
							alt='Peerformance Logo'
						/>
						<div className='row mt-3'>
							<div className='group-inputs p-3'>
								<div className='group-input'>
									<label className='form-label' htmlFor='emailAddress'>
										Email Address
									</label>
									<input
										className='form-control is-invalid'
										type='email'
										id='emailAddress'
										required
										autoFocus
										{...email}
									/>
									<div id='emailValidation' className='invalid-feedback'>
										Invalid email
									</div>
								</div>
								<div className='group-input'>
									<label className='form-label' htmlFor='password'>
										Password
									</label>
									<input
										className='form-control is-invalid'
										type='password'
										id='password'
										required
										{...password}
									/>
									<div id='emailValidation' className='invalid-feedback'>
										Password cannot be empty
									</div>
								</div>
								<div className='group-input'>
									<label className='form-label' htmlFor='confirmPassword'>
										Confirm Password
									</label>
									<input
										className='form-control is-invalid'
										type='password'
										id='confirmPassword'
										required
										{...confirmPassword}
									/>
									<div id='emailValidation' className='invalid-feedback'>
										Confirmation password cannot be empty
									</div>
									<div id='emailValidation' className='invalid-feedback'>
										Passwords should be the same
									</div>
								</div>
								<div className='text-center mt-3'>
									<button
										type='submit'
										className='btn btn-primary text-center w-50'
										value={'Register'}
										onClick={() => {}}
										disabled={false}
									>
										Sign up
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div className='col-7 '>
					<img src='../login_page.png' alt='' />
				</div>
			</div>
		</div>
	);
}

const useFormInput = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return {
		value,
		onChange: handleChange,
	};
};

export default Login;
