const TermsAndConditions = ({ switchAgreed, conditionsAreAgreed, openTermsAndConditionsPopup }) => (
	<div className='form-check mt-3'>
		<input
			className='form-check-input'
			type='checkbox'
			id='checkAgreed'
			onChange={switchAgreed}
			checked={conditionsAreAgreed}
		/>
		<label
			className='form-check-label conditions-label text-decoration-underline c-pointer'
			onClick={openTermsAndConditionsPopup}
		>
			Agree to terms and conditions
		</label>
	</div>
);

export default TermsAndConditions;
