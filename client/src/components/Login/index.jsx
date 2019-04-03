import React from 'react';

class Login extends React.Component {

  constructor() {

      super();

      this.state = {

        email: '',
        password: '',
        errors: {}

      };
  }

  handleInputChange = (event) => {

     this.setState({ [event.target.name]: event.target.value })

  };

  componentWillMount() {

      const user = localStorage.getItem('user');

      if(user) {

        this.props.history.push('/');
      }
  }

  handleSubmit = async (event) => {

      event.preventDefault()

      try {

        const user = await this.props.loginUser(this.state);

        localStorage.setItem('user', JSON.stringify(user));

        this.props.setAuthUser(user);

        this.props.history.push('/');

      } catch (errors) {

          this.setState({ errors });
      }
  }

  render() {

  return (

    <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: 'url(assets/img/bg-girl.jpg)'}}>
    <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
    <h5 className="text-uppercase text-center">Login</h5>
    <br /><br />
    <form onSubmit = {this.handleSubmit}>
    <div className="form-group">
    <input type="text" name = "email" onChange = {this.handleInputChange} className="form-control" placeholder="Username" />
      <small className = "text-danger">{this.state.errors['email']}</small>
    </div>
    <div className="form-group">
    <input type="password" name = "password" onChange = {this.handleInputChange} className="form-control" placeholder="Password" />
      <small className = "text-danger">{this.state.errors['password']}</small>
    </div>
    <div className="form-group flexbox py-10">
    <label className="custom-control custom-checkbox">
    <input type="checkbox" className="custom-control-input" defaultChecked />
    <span className="custom-control-indicator" />
    <span className="custom-control-description">Remember me</span>
    </label>
    <a className="text-muted hover-primary fs-13" href="#">Forgot password?</a>
    </div>
    <div className="form-group">
    <button className="btn btn-bold btn-block btn-primary" type="submit">Login</button>
    </div>
    </form>
    <hr className="w-30" />
    <p className="text-center text-muted fs-13 mt-20">Don't have an account? <a href="register.html">Sign up</a></p>
    </div>
    </div>


  );


  }

}

export default Login;