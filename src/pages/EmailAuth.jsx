import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useHistory } from 'react-router-dom';
import Notification from '../components/Notification';
import { checkAuthToken, refreshAuthToken } from '../Signup/fetches';
import PeerformanceLogo from '../assets/peerformance_logo.svg';
import { PAGES } from '../constants/en';

const EmailAuth = () => {
	const [isAuth, setIsAuth] = useState(undefined);
	const [error, setError] = useState(null);
	const [supervisorEmail, setSupervisorEmail] = useState(null);
	const [submiterEmail, setSubmiterEmail] = useState(null);
	const { search } = useLocation();
	const history = useHistory();

	useEffect(() => {
		const params = new URLSearchParams(search);
		const token = params.get('token');

		if (token) {
			const verifyAuthToken = async () => {
				try {
					const response = await checkAuthToken(token);

					if (response && response.data?.tokenValid) {
						setIsAuth(true);
					} else {
						setIsAuth(false);
						setError(response.data.error);
					}

					const supervisorEmail = response?.data?.supervisorEmail;
					const userEmail = response?.data?.userEmail;
					if (supervisorEmail) setSupervisorEmail(supervisorEmail);
					if (userEmail) setSubmiterEmail(userEmail);
				} catch (error) {
					console.error(PAGES.EMAIL_AUTH.MESSAGES.TOKEN_FAILED, error);
					setIsAuth(false);
				}
			};
			verifyAuthToken();
		}
	}, []);

	const handleRefreshAuthToken = async () => {
		await refreshAuthToken(submiterEmail, supervisorEmail);
		setError(null);
		toast.success(PAGES.EMAIL_AUTH.MESSAGES.ACTIVATION_LINK_SENT, {
			duration: 6000,
			position: 'top-center',
		});
		history.push('/');
	};

	return isAuth !== undefined ? (
		isAuth ? (
			<div className='row email-auth'>
				<div className='col-md-5 col-sm-12 mx-auto'>
					<img
						className='w-50 mx-auto d-block mt-5'
						src={PeerformanceLogo}
						alt='Peerformance Logo'
						width='263'
						height='121'
					/>
					<br/>
					<div className='alert alert-success notification-message mt-4' role='alert'>
						<p className='m-0'>{PAGES.EMAIL_AUTH.MESSAGES.SUCCESSFULLY_AUTHORIZED}</p>
					</div>
				</div>
			</div>
		) : error ? (
			<div className='row email-auth'>
				<div className='col-md-5 col-sm-12 mx-auto'>
					<img
						className='w-50 mx-auto d-block mt-5'
						src={PeerformanceLogo}
						alt='Peerformance Logo'
						width='263'
						height='121'
					/>
					<br/>
					<div className='alert alert-warning notification-message mt-4' role='alert'>
						<p>
							{error}.
							<br />
							If you would like to renew the authorization process,
							<br />
							click on this link{' '}
							<span
								className='text-decoration-underline text-primary c-pointer'
								onClick={handleRefreshAuthToken}
							>
								link
							</span>{' '}
							and check your e-mail address to complete the authorization process.
						</p>
					</div>
				</div>
			</div>
			) : (
				<div className='row email-auth'>
					<div className='col-md-5 col-sm-12 mx-auto'>
						<img
							className='w-50 mx-auto d-block mt-5'
							src={PeerformanceLogo}
							alt='Peerformance Logo'
							width='263'
							height='121'
						/>
						<br />
						<Notification type='danger' message='Invalid token' />
					</div>
				</div>
			)
	) : null;
};

export default EmailAuth;
