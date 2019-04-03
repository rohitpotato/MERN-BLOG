import React from 'react';
import renderHtml from 'react-render-html';

class singleArticle extends React.Component {

  constructor() {

      super();

      this.state = {

          article: null,
          loading: true
      };
  }

  async componentWillMount() {

      let article = this.props.articles.find(article => article.slug === this.props.match.params.slug);

      if (article) {

        this.setState({ article, loading: false });

      } else {

                 article = await this.props.getArticle(this.props.match.params.slug);

              this.setState({ article, loading: false });

      }
  }

  render () {

    return (

      <div>
        
        {

          !this.state.loading &&

          <div>
        <header className="header header-inverse h-fullscreen pb-80" style={{backgroundImage: `url(${this.state.article.image})`}} data-overlay={8}>
        <div className="container text-center">
        <div className="row h-full">
        <div className="col-12 col-lg-8 offset-lg-2 align-self-center">
        <p className="opacity-70">{this.state.article.category.title}</p>
        <br />
        <h1 className="display-4 hidden-sm-down">{this.state.article.title}</h1>
        <h1 className="hidden-md-up">{this.state.article.title}</h1>
        <br />
        <br />
        <p>
        <span className="opacity-70 mr-8">By</span>
        <a className="text-white" href="#">{this.state.article.user.name}</a>
        </p>
        <p>
        <img className="rounded-circle w-40" src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`} alt="..." />
        </p>
        </div>
        <div className="col-12 align-self-end text-center">
        <a className="scroll-down-1 scroll-down-inverse" href="#" data-scrollto="section-content">
        <span />
        </a>
        </div>
        </div>
        </div>
        </header>

        <main className="main-content">

        <div className="section" id="section-content">
        <div className="container">
        <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
        <p className="lead">{renderHtml(this.state.article.body)}</p>
        </div>
     
        <div className="gap-multiline-items-1 mt-30">
        <a className="badge badge-pill badge-default" href="#">Record</a>
        <a className="badge badge-pill badge-default" href="#">Progress</a>
        <a className="badge badge-pill badge-default" href="#">Customers</a>
        <a className="badge badge-pill badge-default" href="#">News</a>
        </div>
        </div>
        </div>
        </div>
    

        <div className="section bt-1 bg-grey">
        <div className="container">
        <div className="row text-center">
        <div className="text-center p-5">
        COMMENTS HERE.
        </div>
        </div>
        </div>
        </div>
        </main>
      </div>

        }

        {

          this.state.loading && 

          <p className="text-center">LOADING....</p>

        }



      </div>


    );

  }

}
export default singleArticle;