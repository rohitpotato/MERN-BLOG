import React from 'react';
import Banner from '../Banner';
import Navbar from '../Navbar';

import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, convertFromHTML, ContentState  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class CreateArticle extends React.Component {

  constructor() {

      super();

      this.state = {

        title: '',
        image: '',
        content:  EditorState.createEmpty(),
        category: '',
        errors: [],
        categories: [],
        editing: false,
        article: null

      };
  }

  handleInputChange = (event) => {

    this.setState({

      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value

    });

  };

  async componentWillMount () {

    const user = localStorage.getItem('user');

    if(!user) {

      this.props.history.push('/login');
    }

    const categories = await this.props.getCategories();

    this.setState({ categories });

    if(this.props.match.params.slug) {

      const articles = await this.props.getArticles(this.props.token.token);
      console.log(articles);
      const article = articles.find(art => art.slug === this.props.match.params.slug);

        if (!article) {

          this.props.history.push('/user/articles');
          return;
        }

      this.setState({editing: true, article, title: article.title, category: article.category, content: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(article.body)))  });
    }
  }

  handleSubmit = async (event) => {

    const html = convertToRaw(this.state.content.getCurrentContent());

    console.log(draftToHtml(html));

    event.preventDefault();

    try {

      const article = await this.props.createArticle({title: this.state.title, 

      content: draftToHtml(convertToRaw(this.state.content.getCurrentContent())), 
      category: this.state.category,
       image: this.state.image

    }, this.props.token.token); 

      this.props.notyService.success('Article Created!');

      this.props.history.push('/');

    } catch (errors) {

      this.setState({ errors });

      this.props.notyService.error('An Error Occured!');
    }

  };

  updateArticle = async (event) => {

      event.preventDefault();

      try {

        await this.props.updateArticle({

              title: this.state.title,
              image: this.state.image,
              content: draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
              category: this.state.category

              }, this.state.article, this.props.token.token);

        this.props.notyService.success('Article Updated!');

        this.props.history.push('/');

      } catch (errors) {

          this.setState({ errors });

          this.props.notyService.error('An Error Occured!!');
      }
  }


  handleEditorState = (editorState) => {

    console.log(editorState);

    this.setState({ content: editorState });
  } 

  render() {


    return (

    <div>
  

    <Banner backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`} title= {this.state.editing ? `Edit Article: ${this.state.title}` : 'Write an Article'} subTitle="Because Sharing helps." />

    <main className="main-content">
    <section className="section">
    <div className="container">
    <div className="row">
    <div className="col-12 col-lg-12">
      <ul className = "list-group">
        
         { this.state.errors.map((error, index) => {

              return <li key = {index} className = "list-group-item text-danger">{error.message}</li>
          })}

      </ul>

    <form className="p-30 bg-gray rounded" onSubmit = {this.state.editing ? this.updateArticle : this.handleSubmit} data-form="mailer">
    <div className="row">
    <div className="form-group col-md-12 my-5">
    <input type="file" name="image" onChange = {this.handleInputChange} className="form-control" />
    </div>
    <div className="form-group col-12 col-md-6">
    <input className="form-control form-control-lg" value = {this.state.title} type="text" onChange = {this.handleInputChange} name="title" placeholder="Title" />
    </div>
    <div className="form-group col-12 col-md-6">
    <select name="category" onChange = {this.handleInputChange}  value = {this.state.category} id className="form-control form-control-lg">
      <option value = { this.state.editing ? this.state.category : '' }>{ this.state.editing ? this.state.category.title : 'Select a Category' }</option>
      {

        this.state.categories.map((cat) => {

          return <option key = {cat._id} value = {cat._id}>{cat.title}</option>

        })

      }
    </select>
    </div>
    </div>
    <div className="form-group">
        <Editor 
        editorState = {this.state.content} 
        onEditorStateChange = {this.handleEditorState}
          
        />
        
    {/* <textarea className="form-control form-control-lg" value = {this.state.content} onChange = {this.handleInputChange} rows={4} placeholder="Content" name="content"  />*/}
    </div>
    <div className="text-center">
    <button className="btn btn-lg btn-primary" type="submit">{this.state.editing ? 'Update Article' : 'Create Article'}</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </section>
    </main>
    </div>

  );

 }

}

export default CreateArticle;