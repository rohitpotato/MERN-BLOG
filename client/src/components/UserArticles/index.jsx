import React from 'react';

import Article from '../Article';
import Banner from '../Banner';

class UserArticles extends React.Component {

	constructor() {

		super();

		this.state = {

			articles: [],
		};
	}

	async componentWillMount() {

		const token = JSON.parse(localStorage.getItem('user')).token;
		console.log(token);

		const articles = await this.props.getUserArticles(token);

		this.setState({ articles });

	}

	deleteArticle = async (id) => {

		const token = JSON.parse(localStorage.getItem('user')).token
		await this.props.deleteArticle(id, token);

		const articles = this.state.articles.filter((article) => {

			return article.id !== id;
		});

		this.setState({ articles: { data: articles } });	
	}

	editArticle = (article) => {

		this.props.history.push(`/article/edit/${article.slug}`);

	};

	render() {

		return (
			<div>	
			<Banner backgroundImage="url(assets/img/bg-gift.jpg)" title="Here are your posts!" subTitle="Have a look and see whats up!" />

			<main className = "main-content bg-gray">

			<div className = "row">
			<div className = "col-12 col-lg-6 offset-lg-3">

				{

					this.state.articles.map((article) => {

						return (<div key = {article.id}>
							
							 <Article article = {article} />

							 <div className = "text-center">
							 	
							 	<button onClick = {() => this.editArticle(article)} className = "btn btn-info mr-5">Edit Article</button>

							 	<button onClick = {() => this.deleteArticle(article._id)} className = "btn btn-danger">Delete Article</button>

							 </div>

						</div>);
					})
				}

			<hr/>

			<nav className="flexbox mt-50 mb-50">
				<a className="btn btn-white" href="#">
					<i className="ti-arrow-left fs-9 ml-4" />Older
				</a>
				<a className="btn btn-white disabled">Newer
					<i className="ti-arrow-right fs-9 mr-4" /> 
				</a>
			</nav>


			</div>
			</div>

			</main>

			</div>
		);
	}
}

export default UserArticles;