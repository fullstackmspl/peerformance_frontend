const InputFeedback = ({ message }) => (
	<div className='invalid-feedback' style={{ whiteSpace: 'pre-wrap' }}>
		{message}
	</div>
);

export default InputFeedback;
