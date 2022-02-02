import React, { Component } from 'react';
import * as fetches from './fetches';
import ConfirmationPopup from './components/ConfirmationPopup';
import TermsAndConditionsPopup from './components/TermsAndConditionsPopup/TermsAndConditionsPopup';
import { passwordStrength } from 'check-password-strength';
import PeerformanceLogo from '../assets/peerformance_logo.svg';
import validator from 'email-syntax-validator';
import TermsAndConditions from './components/TermsAndConditions';
import Button from '../components/Button';
import InputFeedback from '../components/InputFeedback';
import { feedbackMessages } from './constants';
import { PAGES, BUTTONS } from '../constants/en';

const initialFormState = {
	emailAddress: {
		value: '',
		isValid: true,
		error: false,
	},
	password: {
		value: '',
		isValid: true,
		error: false,
	},
	confirmPassword: {
		value: '',
		isValid: true,
		error: false,
	},
	firstName: {
		value: '',
		isValid: true,
	},
	surname: {
		value: '',
		isValid: true,
	},
};

export default class Signup2 extends Component {
	state = {
		inputsForm: initialFormState,
		isConfirmationPopupOpened: false,
		conditionsAreAgreed: false,
		isTermsAndConditionsPopupOpened: false,
		alertMessage: { type: '', message: '' },
	};

	setInputValue = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			...prevState,
			inputsForm: {
				...prevState.inputsForm,
				[name]: {
					...prevState.inputsForm[name],
					value: value,
					isValid: !!value,
				},
			},
		}));
	};

	setInvalidField = (fieldName, value, error) => {
		this.setState((prevState) => {
			return {
				...prevState,
				inputsForm: {
					...prevState.inputsForm,
					[fieldName]: {
						...prevState.inputsForm[fieldName],
						isValid: value,
						error,
					},
				},
			};
		});
	};

	registerAccount = async () => {
		const {
			inputsForm: { emailAddress, password, firstName, surname },
		} = this.state;
		try {
			const response = await fetches.signUp(
				emailAddress.value,
				password.value,
				firstName.value,
				surname.value
			);
			if (response) {
				this.setAlert('success', PAGES.SIGN_UP.MESSAGES.CREATED_ACCOUNT);
				this.clearForm();
			}
		} catch (error) {
			if (error.response) {
				console.log(`error`, error.response);
			}
		} finally {
			this.closeConfirmationPopup();
		}
	};

	checkAccount = async () => {
		const {
			inputsForm: {
				emailAddress: { value },
			},
		} = this.state;
		const response = await fetches.checkAccount(value);
		return response && response.data ? response.data : null;
	};

	refreshTokenMessage = () => (
		<p>
			User activation in progress.
			<br />
			Please check your e-mail or click this link to regenerate process:&nbsp;
			<span
				className='text-decoration-underline text-primary c-pointer'
				onClick={this.handleRefreshToken}
			>
				link
			</span>
		</p>
	);

	handleRefreshToken = async () => {
		await fetches.refreshToken(this.state.inputsForm.emailAddress.value);
		this.setAlert('success', PAGES.SIGN_UP.MESSAGES.EMAIL_SENT);
	};

	onSubmit = async (e) => {
		e.preventDefault();
		this.clearAlert();
		if (this.checkFormIsValid()) {
			const accountInfo = await this.checkAccount();

			if (accountInfo && accountInfo.userExists) {
				this.setAlert('danger', PAGES.SIGN_UP.MESSAGES.ACCOUNT_EXIST);
			} else if (accountInfo.userActivationInProgress) {
				this.setAlert('warning', this.refreshTokenMessage());
			} else if (accountInfo.domainInOrganization) {
				this.openConfirmationPopup();
			} else {
				this.registerAccount();
			}
		} else {
			this.setAlert('danger', PAGES.SIGN_UP.MESSAGES.FILL_REQUIRED_FIELDS);
		}
	};

	checkFormIsValid = () => {
		const { inputsForm } = this.state;
		const hasError = [];

		Object.keys(inputsForm).forEach((field) => {
			switch (field) {
				case 'emailAddress':
					if (inputsForm[field].value && !validator.validate(inputsForm[field].value)) {
						this.setInvalidField(field, false, true);
						hasError.push(1);
					} else {
						this.setInvalidField(field, !!inputsForm[field].value, false);
						hasError.push(!!inputsForm[field].value ? 0 : 1);
					}
					break;
				case 'password':
					if (
						inputsForm[field].value &&
						!this.checkPasswordStrength(inputsForm[field].value)
					) {
						this.setInvalidField(field, !!inputsForm[field].value, true);
						hasError.push(1);
					} else {
						this.setInvalidField(field, !!inputsForm[field].value, false);
						hasError.push(!!inputsForm[field].value ? 0 : 1);
					}
					break;
				case 'confirmPassword':
					if (inputsForm[field].value !== inputsForm.password.value) {
						this.setInvalidField(field, !!inputsForm[field].value, true);
						hasError.push(1);
					} else {
						this.setInvalidField(field, !!inputsForm[field].value, false);
						hasError.push(!!inputsForm[field].value ? 0 : 1);
					}
					break;
				default:
					this.setInvalidField(field, !!inputsForm[field].value);
					hasError.push(!!inputsForm[field].value ? 0 : 1);
					break;
			}
		});

		return !hasError.some((i) => i === 1);
	};

	checkPasswordStrength = (password) => passwordStrength(password)?.id === 3;

	closeConfirmationPopup = () => {
		this.setState({
			isConfirmationPopupOpened: false,
		});
	};

	openConfirmationPopup = () => {
		this.setState({
			isConfirmationPopupOpened: true,
		});
	};

	closeTermsAndConditionsPopup = () => {
		this.setState({
			isTermsAndConditionsPopupOpened: false,
		});
	};

	openTermsAndConditionsPopup = () => {
		this.setState({
			isTermsAndConditionsPopupOpened: true,
		});
	};

	agreedOrDisagreedConditions = (value) => {
		this.closeTermsAndConditionsPopup();
		this.setState({
			conditionsAreAgreed: value,
		});
	};

	switchAgreed = () => {
		this.setState({
			conditionsAreAgreed: !this.state.conditionsAreAgreed,
		});
	};

	setAlert = (type, message) => this.setState({ alertMessage: { type, message } });
	clearAlert = () => this.setState({ alertMessage: { type: '', message: '' } });

	clearForm = () => this.setState({ inputsForm: initialFormState, conditionsAreAgreed: false });

	render() {
		const {
			inputsForm: { emailAddress, password, confirmPassword, firstName, surname },
			isConfirmationPopupOpened,
			conditionsAreAgreed,
			isTermsAndConditionsPopupOpened,
			alertMessage,
		} = this.state;
		const {
			registerAccount,
			onSubmit,
			closeConfirmationPopup,
			closeTermsAndConditionsPopup,
			openTermsAndConditionsPopup,
			agreedOrDisagreedConditions,
			switchAgreed,
		} = this;
		const { SIGN_UP } = PAGES;
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-5 col-sm-12 mx-auto'>
						<img
							className='w-50 mx-auto d-block mt-5'
							src={PeerformanceLogo}
							alt='Peerformance Logo'
						/>
						<br/>
						<form noValidate className='w-100' onSubmit={onSubmit}>
							<div className='row mt-3'>
								<div className='group-inputs p-3'>
									{alertMessage.message && (
										<div
											className={`alert alert-${alertMessage.type} notification-message`}
											role='alert'
										>
											{alertMessage.message}
										</div>
									)}
									<div className='group-input mt-2'>
										<label htmlFor='firstName'>{SIGN_UP.FORM.FIRST_NAME.LABEL}</label>
										<input
											className={`form-control mt-2 ${
												!firstName.isValid ? 'is-invalid' : ''
											}`}
											type='text'
											id='firstName'
											name='firstName'
											value={firstName.value}
											onChange={this.setInputValue}
											placeholder={SIGN_UP.FORM.FIRST_NAME.PLACEHOLDER}
											autoFocus
											required
										/>
										{!this.state.inputsForm.firstName.isValid && (
											<InputFeedback message={feedbackMessages.firstName} />
										)}
									</div>
									<div className='group-input mt-3'>
										<label htmlFor='surname'>{SIGN_UP.FORM.LAST_NAME.LABEL}</label>
										<input
											className={`form-control mt-2 ${
												!surname.isValid ? 'is-invalid' : ''
											}`}
											type='text'
											id='surname'
											name='surname'
											value={surname.value}
											placeholder={SIGN_UP.FORM.LAST_NAME.PLACEHOLDER}
											onChange={this.setInputValue}
											required
										/>
										{!this.state.inputsForm.surname.isValid && (
											<InputFeedback message={feedbackMessages.lastName} />
										)}
									</div>
									<div className='group-input mt-3'>
										<label htmlFor='emailAddress'>{SIGN_UP.FORM.EMAIL.LABEL}</label>
										<input
											className={`form-control mt-2 ${
												!emailAddress.isValid || emailAddress.error
													? 'is-invalid'
													: ''
											}`}
											type='email'
											id='emailAddress'
											name='emailAddress'
											value={emailAddress.value}
											onChange={this.setInputValue}
											placeholder={SIGN_UP.FORM.EMAIL.PLACEHOLDER}
											required
										/>
										{!this.state.inputsForm.emailAddress.isValid &&
											!this.state.inputsForm.emailAddress.error && (
												<InputFeedback
													message={feedbackMessages.emailRequired}
												/>
											)}
										{!this.state.inputsForm.emailAddress.isValid &&
											this.state.inputsForm.emailAddress.error && (
												<InputFeedback
													message={feedbackMessages.invalidEmail}
												/>
											)}
									</div>
									<div className='group-input mt-3'>
										<label htmlFor='password'>{SIGN_UP.FORM.PASSWORD.LABEL}</label>
										<input
											className={`form-control mt-2 ${
												!password.isValid || password.error
													? 'is-invalid'
													: ''
											}`}
											type='password'
											id='password'
											name='password'
											value={password.value}
											onChange={this.setInputValue}
											placeholder={SIGN_UP.FORM.PASSWORD.PLACEHOLDER}
											required
										/>
										{!this.state.inputsForm.password.isValid && (
											<InputFeedback
												message={feedbackMessages.emptyPassword}
											/>
										)}
										{this.state.inputsForm.password.error && (
											<InputFeedback
												message={feedbackMessages.passwordRequirements}
											/>
										)}
									</div>
									<div className='group-input mt-3'>
										<label htmlFor='confirmPassword'>{SIGN_UP.FORM.CONFIRM_PASSWORD.LABEL}</label>
										<input
											className={`form-control mt-2 ${
												!confirmPassword.isValid || confirmPassword.error
													? 'is-invalid'
													: ''
											}`}
											type='password'
											id='confirmPassword'
											name='confirmPassword'
											value={confirmPassword.value}
											onChange={this.setInputValue}
											placeholder={SIGN_UP.FORM.CONFIRM_PASSWORD.PLACEHOLDER}
											required
										/>
										{!this.state.inputsForm.confirmPassword.isValid && (
											<InputFeedback
												message={feedbackMessages.emptyConnfirmPassword}
											/>
										)}
										{this.state.inputsForm.confirmPassword.error && (
											<InputFeedback
												message={feedbackMessages.samePasswords}
											/>
										)}
									</div>
									<TermsAndConditions
										switchAgreed={switchAgreed}
										conditionsAreAgreed={conditionsAreAgreed}
										openTermsAndConditionsPopup={openTermsAndConditionsPopup}
									/>
									<Button
										type='submit'
										text={BUTTONS.SIGN_UP}
										disabled={!conditionsAreAgreed}
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
				<ConfirmationPopup
					isConfirmationPopupOpened={isConfirmationPopupOpened}
					closeConfirmationPopup={closeConfirmationPopup}
					registerAccount={registerAccount}
				/>
				<TermsAndConditionsPopup
					isOpen={isTermsAndConditionsPopupOpened}
					closePopup={closeTermsAndConditionsPopup}
					setAgreeConditionsValue={agreedOrDisagreedConditions}
				/>
			</div>
		);
	}
}
