import React, { PureComponent, Fragment } from 'react';
import Router from 'next/router';
import store from 'store';
import Head from 'next/head';
import { withTheme } from 'emotion-theming';
import { withThemeIndex } from 'components/ThemeIndexProvider';
import ReadPage from 'components/Pages/Read';

class Read extends PureComponent {
  constructor (props) {
    super(props);

    const article = store.get('currentArticle');
    this.state = { article };
  }

  componentDidMount() {
    const { article } = this.state;
    const { theme, themeIndex } = this.props;

    if (!article) {
      Router.push('/');
    }
    document.body.style.backgroundColor = theme.colors[themeIndex].primary;
  }

  render() {
    const { article } = this.state;

    if (article) {
      return (
        <Fragment>
          <Head>
            <title>EasyRead.io - {article.title}</title>
          </Head>
          <style jsx global>{`
            html,body,#__next{min-height:100%;}
          `}</style>
          <ReadPage article={article} />
        </Fragment>
      );
    }

    return null;
  }
}

export default withTheme(withThemeIndex(Read));
