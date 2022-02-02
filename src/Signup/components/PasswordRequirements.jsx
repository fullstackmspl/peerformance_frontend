const PassworRequirements = () => (
	<div className='invalid-feedback'>
		Password should has:
		<ul>
			<li>At least 10 characters long</li>
			<li>
				Should include combination of uppercase letters, lowercase letters, numbers, and
				symbols
			</li>
			<li>Should include at least 1 entry from every group of the above</li>
		</ul>
	</div>
);

export default PassworRequirements;
