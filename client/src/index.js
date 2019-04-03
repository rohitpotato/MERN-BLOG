import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import Welcome from './components/Welcome/';
import Navbar from './components/Navbar/';
import Article from './components/Article';
import UserArticles from './components/UserArticles';
import Login from './components/Login';
import Register from './components/Register';	
import CreateArticle from './components/CreateArticle';
import SingleArticle from './components/SingleArticle';
import Footer from './components/Footer';
import * as serviceWorker from './serviceWorker';

import AuthService from './services/auth';
import ArticleService from './services/articles';
import NotificationService from './services/notifications';

class App extends React.Component {

	constructor() {

		super();

		this.state = {

			authUser: null,
			articles: []

		};
	}

	componentDidMount() {

		const user = localStorage.getItem('user')

		if (user) {

			this.setState({ authUser: JSON.parse(user) });
		}
	}

	setAuthUser = (authUser) => {

		this.setState({

			authUser

		}, () => {

			this.props.notyService.success('Successfully Logged In!');
		})
	}

	removeAuthUser = () => {

		localStorage.removeItem('user');

		this.setState({ authUser: null });
	}

	setArticles = (articles) => {

		this.setState({articles});
	}

	render() {

		const {location} = this.props;

		return (

		<div>
			{location.pathname !== '/login' && location.pathname !== '/register' && <Navbar removeAuthUser = {this.removeAuthUser} authUser = {this.state.authUser}/>}
			
			<Route exact path = "/" 

				render={(props) => <Welcome {...props} setArticles = {this.setArticles} getArticles = {this.props.articleService.getArticles}/>}

			 />
			

			<Route path = "/articles/create" 

				render={(props) => <CreateArticle {...props} notyService = {this.props.notyService} token = {this.state.authUser} createArticle = {this.props.articleService.createArticle} getCategories = {this.props.articleService.getCategories}/>} />

			<Route path = "/article/edit/:slug" 

				 render={(props) => <CreateArticle {...props} notyService = {this.props.notyService} updateArticle = {this.props.articleService.updateArticle} getArticles = {this.props.articleService.getArticles} articles = {this.state.articles} token = {this.state.authUser} createArticle = {this.props.articleService.createArticle} getCategories = {this.props.articleService.getCategories}/>} />


			<Route path = "/user/articles" setArticles = {this.setArticles} render = {(props) => <UserArticles {...props} token = {this.state.authUser}  deleteArticle = {this.props.articleService.deleteArticle} getUserArticles = {this.props.articleService.getUserArticles} />} />


			<Route path = "/login" 	

				render={(props) => <Login {...props} loginUser = {this.props.authService.LoginUser} setAuthUser = {this.setAuthUser}/>}

			 />

			<Route path = "/article/:slug" 

				exact render = {(props) => <SingleArticle {...props}  articles = {this.state.articles} getArticle = {this.props.articleService.getArticle} />}

			 />

			<Route path = "/register" 
				render = {(props) => <Register {...props} notyService = {this.props.notyService} registerUser = {this.props.authService.registerUser} setAuthUser = {this.setAuthUser}/>} />
			{ location.pathname !== '/login' && location.pathname !== '/register' && <Footer /> }
		</div>

		);
	}
}

const Main = withRouter((props) => {

	return (

		<App 

			articleService = {new ArticleService}
			notyService = {new NotificationService()}
			authService = {new AuthService} {...props}/>
	);	


});


ReactDOM.render(

	<BrowserRouter>
		<Main />
	</BrowserRouter>

	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
