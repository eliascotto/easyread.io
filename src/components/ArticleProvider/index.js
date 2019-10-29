import React, { PureComponent, createContext } from 'react';

const ArticleContext = createContext();

class ArticleProvider extends PureComponent {
  state = {
    title: null,
    content: null,
    url: null,
    setArticle: (article) => {
      const { title, content, url } = article;
      this.setState({ title, content, url });
    },
    resetArticle: () => this.setState({
      title: null,
      content: null,
      url: null,
    }),
  }

  render() {
    return(
      <ArticleContext.Provider value={this.state}>
        {this.props.children}
      </ArticleContext.Provider>
    );
  }
}

const ArticleConsumer = ArticleContext.Consumer;

export default ArticleProvider;
export { ArticleConsumer };
