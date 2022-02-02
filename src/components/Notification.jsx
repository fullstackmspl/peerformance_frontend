const Notification = ({ type, message }) => {
	const alertClasses = ['alert', 'notification-message', 'm-4'];

	switch (type) {
		case 'primary':
			alertClasses.push('alert-primary');
			break;
		case 'success':
			alertClasses.push('alert-success');
			break;
		case 'danger':
			alertClasses.push('alert-danger');
			break;
		case 'warning':
			alertClasses.push('alert-warning');
			break;
		default:
			alertClasses.push('alert-danger');
			break;
	}

	return (
		<div className={alertClasses.join(' ')} role='alert'>
			{message}
		</div>
	);
};

export default Notification;
