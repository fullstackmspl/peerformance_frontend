import React, { Component } from 'react';
import toast from 'react-hot-toast';
import * as fetches from './fetches';
import PeerformanceLogo from '../assets/peerformance_logo.svg';
import SecurityQuestionsPage from './components/SecurityQuestionsPage';
import SubmitPage from './components/SubmitPage';
import Notification from '../components/Notification';
import { withRouter } from 'react-router-dom';

class CompanyInformations extends Component {
	state = {
		isAuth: undefined,
		tokenError: null,
		page: 1,
		userEmail: '',
		questionsForm: {
			firstQuestion: {
				value: '',
			},
			firstAnswer: {
				value: '',
				isValid: true,
			},
			secondQuestion: {
				value: '',
			},
			secondAnswer: {
				value: '',
				isValid: true,
			},
		},
		companyInfoForm: {
			isFilled: false,
			organizationId: null,
			name: {
				value: '',
			},
			numberOfEmployees: {
				value: '',
			},
			annualRevenue: {
				value: '',
			},
			reach: {
				value: '',
			},
			authorizationContactEmail: {
				value: '',
				isValid: true,
			},
		},
	};

	async componentDidMount() {
		const search = this.props.location.search;
		const params = new URLSearchParams(search);
		const token = params.get('token');

		if (token) {
			try {
				const response = await fetches.checkToken(token);

				if (response && response.data?.tokenValid) {
					this.setIsAuth(true);

					const organizationData = response?.data.organization;
					if (organizationData) {
						this.setState({
							companyInfoForm: {
								...this.state.companyInfoForm,
								isFilled: true,
								organizationId: organizationData.id,
								name: {
									value: organizationData.Name,
								},
								numberOfEmployees: {
									value: organizationData.NumberOfEmployeesID,
								},
								annualRevenue: {
									value: organizationData.AnnualRevenueID,
								},
								reach: {
									value: organizationData.ReachID,
								},
							},
						});
					}
				} else {
					this.setState({ isAuth: false, tokenError: response.data.error });
				}

				const userEmail = response?.data?.email;
				if (userEmail) this.setState({ userEmail });
			} catch (error) {
				console.error('Token failed: ', error);
				this.setIsAuth(false);
			}
		}
	}

	nextPage = () => this.setState({ page: 2 });

	setIsAuth = (isAuth) => this.setState({ isAuth });

	setQuestionFormValue = (e) => {
		const { name, value } = e.target;
		this.setState((state) => ({
			questionsForm: {
				...state.questionsForm,
				[name]: {
					...state.questionsForm[name],
					value: value,
				},
			},
		}));
	};

	setCompanyInfoFormValue = (e) => {
		const { name, value } = e.target;
		this.setState((state, _props) => ({
			companyInfoForm: {
				...state.companyInfoForm,
				[name]: {
					...state.companyInfoForm[name],
					value: value,
				},
			},
		}));
	};

	setAuthorizationContactEmail = (value) => {
		this.setState((state, _props) => ({
			companyInfoForm: {
				...state.companyInfoForm,
				authorizationContactEmail: {
					...state.companyInfoForm.authorizationContactEmail,
					value: value,
				},
			},
		}));
	};

	onSubmit = async () => {
		const userData = {
			email: this.state.userEmail,
			firstQuestion: parseInt(this.state.questionsForm.firstQuestion.value, 10),
			firstAnswer: this.state.questionsForm.firstAnswer.value,
			secondQuestion: parseInt(this.state.questionsForm.secondQuestion.value, 10),
			secondAnswer: this.state.questionsForm.secondAnswer.value,
			authorizationContactEmail: this.state.companyInfoForm.authorizationContactEmail.value,
		};

		if (this.state.companyInfoForm.isFilled) {
			const updatedUserData = Object.assign(
				{ organizationId: this.state.companyInfoForm.organizationId },
				userData
			);
			try {
				const response = await fetches.createUser(updatedUserData);
				toast.success(response.data.message, {
					duration: 6000,
					position: 'top-center',
				});
			} catch (error) {
				console.log(error);
			}
		} else {
			const companyData = {
				name: this.state.companyInfoForm.name.value,
				numberOfEmployees: parseInt(this.state.companyInfoForm.numberOfEmployees.value, 10),
				annualRevenue: parseInt(this.state.companyInfoForm.annualRevenue.value, 10),
				reach: parseInt(this.state.companyInfoForm.reach.value, 10),
				domain: this.state.userEmail.split('@')[1],
			};

			const updatedUserData = Object.assign({ organizationId: null }, userData);

			try {
				const response = await fetches.createCompany(companyData);
				updatedUserData.organizationId = response.data.organizationId;
			} catch (error) {
				console.log(error);
			}

			try {
				const response = await fetches.createUser(updatedUserData);
				toast.success(response.data.message, {
					duration: 6000,
					position: 'top-center',
				});
			} catch (error) {
				console.log(error);
			}
		}

		this.props.history.push('/');
	};

	handleRefreshToken = async () => {
		await fetches.refreshToken(this.state.userEmail);
		this.setState({ tokenError: null });
		toast.success('Activation link has been sent.', {
			duration: 6000,
			position: 'top-center',
		});
		this.props.history.push('/');
	};

	render() {
		const { questionsForm, companyInfoForm, isAuth, tokenError } = this.state;
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-5 col-sm-12 mx-auto'>
						<form noValidate className='w-100'>
							<img
								className='w-50 mx-auto d-block mt-5'
								src={PeerformanceLogo}
								alt='Peerformance Logo'
								width='263'
								height='121'
							/>
							<br/>
							{isAuth !== undefined ? (
								isAuth ? (
									<div className='row mt-3'>
										{this.state.page === 1 ? (
											<SecurityQuestionsPage
												form={questionsForm}
												onChange={this.setQuestionFormValue}
												onNextButtonClick={this.nextPage}
											/>
										) : (
											<SubmitPage
												form={companyInfoForm}
												onChange={this.setCompanyInfoFormValue}
												onSubmit={this.onSubmit}
												userEmail={this.state.userEmail}
												setAuthorizationContactEmail={
													this.setAuthorizationContactEmail
												}
											/>
										)}
									</div>
								) : tokenError ? (
									<div
										className='alert alert-warning notification-message mt-4'
										role='alert'
									>
										<p>
											{tokenError}.
											<br />
											If you would like to renew the account creation process,
											<br />
											click on this link{' '}
											<span
												className='text-decoration-underline text-primary c-pointer'
												onClick={this.handleRefreshToken}
											>
												link
											</span>{' '}
											and check your e-mail address to complete the activation
											process.
										</p>
									</div>
								) : (
									<Notification type='danger' message='Invalid token' />
								)
							) : null}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(CompanyInformations);
