const Button = ({ type = 'button', onClick = () => {}, disabled = false, text }) => (
	<div className='text-center mt-4'>
		<button
			type={type}
			className='btn btn-primary text-center w-100'
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	</div>
);

export default Button;
