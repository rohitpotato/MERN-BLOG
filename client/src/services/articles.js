import Axios, { post } from 'axios';
import { validateAll } from 'indicative';

export default class ArticleService {

	async getCategories () {

		const categories = await Axios.get('/category/all');

		return categories.data;
	}

	async getArticles() {

		const articles = await Axios.get('/blog/all');

		return articles.data;
	}

	async getArticle(slug) {

		const response = await Axios.get(`/blog/${slug}`);

		return response.data;
	}

	async getUserArticles(token) {

		 const response = await Axios.get(`/blog/user`, {

		 	headers: {

		 		Authorization: token
		 	}
		 });

		 return response.data
	}

	async deleteArticle(id, token) {

		const response = await Axios.delete(`/blog/delete/${id}`, {

			headers: {

				Authorization: token
			}
		});

		return true;
	}

	 createArticle = async (data, token) => {

		try {

			const rules = {

				title: 'required',
				content: 'required',
				category: 'required',

			};

			await validateAll(data, rules)

			const image = await this.uploadImage(data.image);

			const response = Axios.post('/blog', {

				title: data.title,
				body: data.content,
				category: data.category,
				image: image.secure_url,
			},{

				headers: {

					Authorization: token
				}
			});

			console.log(response);

			return response;

		} catch (errors) {

			if (errors.response) {

				return Promise.reject(errors.response.data);
			}

			return Promise.reject(errors);
		}	
	}

	updateArticle = async (data, article, token) => {

		let image;

		if (data.image) {

			image = await this.uploadImage(data.image)
		}


		try {

			const rules = {

				title: 'required',
				content: 'required',
				category: 'required',

			};

			await validateAll(data, rules)

			const response = Axios.put(`/blog/update/${article._id}`, {

				title: data.title,
				body: data.content,
				category: data.category,
				image: image ? image.secure_url : article.image
			},{

				headers: {

					Authorization: token
				}
			});

			console.log(response);

			return response;

		} catch (errors) {

			if (errors.response) {

				return Promise.reject(errors.response.data);
			}

			return Promise.reject(errors);
		}	

	}

	async uploadImage(image) {

		const form = new FormData();

		form.append('file', image);
		form.append('upload_preset', 'g5ziunzg');

		const res = await Axios.post('https://api.cloudinary.com/v1_1/bahdcoder/image/upload', form)
		console.log(res)
		return res.data;
	}
}