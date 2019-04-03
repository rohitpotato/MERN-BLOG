import Axios from 'axios';
import { validateAll } from 'indicative';

export default class AuthService {

	async registerUser (data) {

		const rules = {

			name: 'required|string',
			email: 'required|email',
			password: 'required|string|min:6|confirmed',

		};  

		const messages = {

			required: 'This field is required.',
			'email.email': 'The email is invalid',
			'password.confirmed': 'The password confirmation does not match'

		};

		try {

			await validateAll(data, rules)

			const res = await Axios.post(`/auth/register`, {

					name: data.name,
					email: data.email,
					password: data.password

				})

			return res.data

		} catch (errors) {

			const formattedErrors = {}

			if (errors.res && errors.res.status === 400) {

				formattedErrors['email'] = errors.response.data['email'];

				return Promise.reject(formattedErrors)
			}

			errors.forEach(error => formattedErrors[error.field] = error.message)

			return Promise.reject(formattedErrors)

		}
	}

		async LoginUser (data) {

		const rules = {

			email: 'required|email',
			password: 'required|string',

		};  

		const messages = {

			required: 'This field is required.',
			'email.email': 'The email is invalid',

		};

		try {

			await validateAll(data, rules)

			const res = await Axios.post(`/auth/login`, {

					email: data.email,
					password: data.password

				})

			return res.data

		} catch (errors) {

			const formattedErrors = {}

			if (errors.res && errors.res.status === 400) {

				formattedErrors['email'] = 'Invalid Credentials';

				return Promise.reject(formattedErrors)
			}

			errors.forEach(error => formattedErrors[error.field] = error.message)

			return Promise.reject(formattedErrors)

		}
	}
}