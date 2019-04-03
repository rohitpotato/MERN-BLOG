import Noty from 'noty'

export default class NotificationService {

	success(message) {

		(new Noty({

			text: message

		})).show();
	}

	error(message) {

		(new Noty({

			text: message,
			type: 'error'

		})).show();
	}
}