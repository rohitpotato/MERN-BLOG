import React from 'react';
import Article from '../Article';
import Banner from '../Banner';

class Welcome extends React.Component {

	constructor() {

		super();

		this.state = {

			articles: [],
		};
	}

	async componentWillMount() {

		const articles = await this.props.getArticles();

		this.setState({ articles })

		this.props.setArticles(articles)
	}

	render() {

		return (
			<div>	
			<Banner backgroundImage="url(assets/img/bg-gift.jpg)" title="Latest Blog Posts" subTitle="Read and get updated on how we progress." />

			<main className = "main-content bg-gray">

			<div className = "row">
			<div className = "col-12 col-lg-6 offset-lg-3">

				{

					this.state.articles.map((article) => {

						return (<div key = {article.id}>
							
							 <Article article = {article} />

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

export default Welcome;