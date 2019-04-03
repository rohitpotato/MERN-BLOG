import React from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import config from '../../config';
import { validateAll } from 'indicative'; 

class Register extends React.Component {

    constructor() {

        super();

          this.state = {

            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: {}

          };

    }

    handleInputChange = (event) => {

      this.setState({ [event.target.name]: event.target.value });

    }; 

    handleSubmit = async (event) => {

      event.preventDefault()

      const data = this.state;


      try {

            const user = await this.props.registerUser(this.state)

            localStorage.setItem('user', JSON.stringify(user))

            this.props.setAuthUser(user)

            this.props.history.push('/');

      } catch (errors) {

          this.setState({ errors  })

     }

    };

    componentWillMount() {

      const user = localStorage.getItem('user');

      if(user) {

        this.props.history.push('/');
      }
  }

    render() {

      return (


        <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: 'url(assets/img/bg-girl.jpg)'}}>
        <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
        <h5 className="text-uppercase text-center">Register</h5>
        <br />
        <br />
        <form className="form-type-material" onSubmit = {this.handleSubmit}>
        <div className="form-group">
        <input type="text" name = "name" className="form-control" onChange = {this.handleInputChange} placeholder="Username" />
          <small className = "text-danger">{this.state.errors['name']}</small>
        </div>
        <div className="form-group">
        <input type="text" name = "email" className="form-control" onChange = {this.handleInputChange} placeholder="Email address" />
           <small className = "text-danger">{this.state.errors['email']}</small>
        </div>
        <div className="form-group">
        <input type="password" name = "password" className="form-control" onChange = {this.handleInputChange} placeholder="Password" />
           <small className = "text-danger">{this.state.errors['password']}</small>
        </div> 
        <div className="form-group">
        <input type="password" name = "password_confirmation" className="form-control" onChange = {this.handleInputChange}  placeholder="Password (confirm)" />
           <small className = "text-danger">{this.state.errors['password_confirmation']}</small>
        </div>
        <br />
        <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
        </form>
        <hr className="w-30" />
        <p className="text-center text-muted fs-13 mt-20">Already have an account?
        <Link to="/login">Sign in</Link>
        </p>
        </div>
        </div>



        );
    }
}

export default Register;
