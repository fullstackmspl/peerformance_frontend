import React, { useEffect, useState } from 'react';
import { getCompanyDictionaries } from '../fetches';
import Button from '../../components/Button';
import LabelWithQuestionMark from '../../components/LabelWithQuestionMark';
import { PAGES, BUTTONS } from '../../constants/en';

const selectConfig = [
	['numberOfEmployees', PAGES.COMPANY_INFORMATIONS.FIELDS.NUMBER_OF_EMPLOYEES.LABEL, 'numberOfEmployees'],
	['annualRevenue', PAGES.COMPANY_INFORMATIONS.FIELDS.ANNUAL_REVENUE.LABEL, 'annualRevenue'],
	['reach', PAGES.COMPANY_INFORMATIONS.FIELDS.COMPANY_REACH.LABEL, 'reach'],
];

const SubmitPage = ({ onSubmit, form, userEmail, onChange, setAuthorizationContactEmail }) => {
	const [companyDictionaries, setCompanyDictionaries] = useState(null);
	const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
	const [allowSelfAuth, setAllowSelfAuth] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getCompanyDictionaries();

				if (result && result.data) {
					setCompanyDictionaries(result.data);
				}
			} catch (error) {
				console.error(true);
			}
		};

		fetchData();
	}, []);

	const handleAllowSelfAuth = (e) => {
		setAllowSelfAuth((prevState) => !prevState);
		const isChecked = e.target.checked;
		isChecked ? setAuthorizationContactEmail(userEmail) : setAuthorizationContactEmail('');
	};

	const renderSelectValue = (selectName) =>
		companyDictionaries?.[selectName]?.find((el) => el.ID === form[selectName].value)?.value;

	const setAlert = (type, message) => setAlertMessage({ type, message });

	const checkFormIsFilled = () =>
		!Object.keys(form)
			.filter((inp) => inp !== 'isFilled' && inp !== 'organizationId')
			.every((input) => !!form[input].value);

	const renderSelects = (name, title, options) => {
		return (
			<div key={name} className='group-input mt-4'>
				<LabelWithQuestionMark
					name={name}
					title={title}
					notificationMessage='We need this to be able to compare you to businesses of a similar size'
				/>
				<select
					id={name}
					name={name}
					value={renderSelectValue(name)}
					defaultValue=''
					onChange={onChange}
					className='form-select p-2 mt-2'
					disabled={form.isFilled}
					style={form[name].value === '' ? { color: '#8B8898' } : null}
				>
					{!form.isFilled && (
						<option hidden value=''>
							Choose one
						</option>
					)}
					{companyDictionaries?.[options]?.map((obj) => (
						<option key={obj.value} value={obj.ID}>
							{obj.value}
						</option>
					))}
				</select>
			</div>
		);
	};

	const handleSubmit = () => {
		if (!allowSelfAuth && form.authorizationContactEmail.value === userEmail) {
			setAlert(
				'danger',
				PAGES.COMPANY_INFORMATIONS.MESSAGES.DIFFERENT_EMAIL
			);
		} else if (form.authorizationContactEmail.value.split('@')[1] !== userEmail.split('@')[1]) {
			setAlert('danger', PAGES.COMPANY_INFORMATIONS.MESSAGES.EMAIL_FROM_THE_SAME_DOMAIN);
		} else {
			onSubmit();
		}
	};

	return (
		<div className='group-inputs p-3'>
			{alertMessage.message && (
				<div
					className={`alert alert-${alertMessage.type} notification-message`}
					role='alert'
				>
					{alertMessage.message}
				</div>
			)}
			<div className='group-input mt-4'>
				<LabelWithQuestionMark
					name='name'
					title={PAGES.COMPANY_INFORMATIONS.FIELDS.COMPANY_NAME.LABEL}
					notificationMessage={PAGES.COMPANY_INFORMATIONS.FIELDS.COMPANY_NAME.NOTIFICATION}
				/>
				<input
					className='form-control mt-2'
					type='text'
					id='name'
					name='name'
					value={form.name.value}
					onChange={onChange}
					placeholder={PAGES.COMPANY_INFORMATIONS.FIELDS.COMPANY_NAME.PLACEHOLDER}
					readOnly={form.isFilled}
				/>
			</div>
			{selectConfig.map((s) => renderSelects(...s))}
			<div className='group-input mt-4'>
				<LabelWithQuestionMark
					name='authorizationContactEmail'
					title={PAGES.COMPANY_INFORMATIONS.FIELDS.CONTACT_EMAIL.LABEL}
					notificationMessage={PAGES.COMPANY_INFORMATIONS.FIELDS.CONTACT_EMAIL.NOTIFICATION}
				/>
				<input
					className={`form-control mt-2 ${alertMessage.message ? 'is-invalid' : ''}`}
					type='email'
					id='authorizationContactEmail'
					name='authorizationContactEmail'
					value={form.authorizationContactEmail.value}
					onChange={onChange}
					placeholder={PAGES.COMPANY_INFORMATIONS.FIELDS.CONTACT_EMAIL.PLACEHOLDER}
					disabled={allowSelfAuth}
				/>
			</div>
			<div className='group-input mt-4'>
				<div className='form-check'>
					<input
						className='form-check-input'
						type='checkbox'
						onChange={handleAllowSelfAuth}
						checked={allowSelfAuth}
						id='self-authorization-requirement'
					/>
					<label className='form-check-label' for='self-authorization-requirement'>
						{PAGES.COMPANY_INFORMATIONS.FIELDS.SELF_AUTHORIZATION.LABEL}
					</label>
				</div>
			</div>
			<Button onClick={handleSubmit} text={BUTTONS.SUBMIT} disabled={checkFormIsFilled()} />
		</div>
	);
};

export default SubmitPage;
