import { useState, useEffect } from 'react';
import { getSecurityQuestions } from '../fetches';
import Button from '../../components/Button';
import { PAGES,BUTTONS } from '../../constants/en';

const questionConfig = [
	[PAGES.COMPANY_INFORMATIONS.FIELDS.QUESTION1.LABEL, 'firstQuestion', 'q1', PAGES.COMPANY_INFORMATIONS.FIELDS.ANSWER1.LABEL, 'firstAnswer'],
	[PAGES.COMPANY_INFORMATIONS.FIELDS.QUESTION2.LABEL, 'secondQuestion', 'q2', PAGES.COMPANY_INFORMATIONS.FIELDS.ANSWER2.LABEL, 'secondAnswer'],
];

const SecurityQuestionsPage = ({ onNextButtonClick, form, onChange }) => {
	const [securityQuestions, setSecurityQuestions] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getSecurityQuestions();

				if (result && result.data && result.data.securityQuestions) {
					setSecurityQuestions(result.data.securityQuestions);
				}
			} catch (error) {
				console.error(true);
			}
		};

		fetchData();
	}, []);

	const renderSecurityQuestions = (
		questionTitle,
		questionName,
		group,
		answerTitle,
		answerName
	) => {
		return (
			<div key={questionName} className={questionName !== 'firstQuestion' ? 'mt-4' : ''}>
				<div className='group-input'>
					<label htmlFor={questionName}>{questionTitle}</label>
					<select
						id={questionName}
						name={questionName}
						value={form[questionName].value}
						defaultValue=''
						onChange={onChange}
						className='form-select p-2 mt-2'
						style={form[questionName].value === '' ? { color: '#8B8898' } : null}
					>
						<option hidden value=''>
							{PAGES.COMPANY_INFORMATIONS.FIELDS.QUESTION1.PLACEHOLDER}
						</option>
						{securityQuestions &&
							securityQuestions[group].map((q) => (
								<option key={q.ID} value={q.ID}>
									{q.SecurityQuestion}
								</option>
							))}
					</select>
				</div>
				<div className='group-input mt-2'>
					<label htmlFor={answerName}>{answerTitle}</label>
					<input
						className='form-control p-2 mt-2'
						type='text'
						id={answerName}
						name={answerName}
						value={form[answerName].value}
						placeholder={PAGES.COMPANY_INFORMATIONS.FIELDS.ANSWER1.PLACEHOLDER}
						onChange={onChange}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className='group-inputs p-3'>
			{questionConfig.map((q) => renderSecurityQuestions(...q))}
			<Button
				onClick={onNextButtonClick}
				text={BUTTONS.NEXT}
				disabled={!form.firstAnswer.value || !form.secondAnswer.value}
			/>
		</div>
	);
};

export default SecurityQuestionsPage;
