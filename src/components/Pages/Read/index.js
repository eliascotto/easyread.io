import React, { PureComponent } from 'react';
import Router from 'next/router';
import store from 'store';
import { withTheme } from 'emotion-theming';
import { withThemeIndex } from 'components/ThemeIndexProvider';
import { withFontSize } from 'components/FontSizeProvider';
import Highlight from 'highlight';
import Header from 'components/Header';
import SettingsBar from 'components/SettingsBar';
import { Container, ArticleContainer, ContentContainer, StyledTitle } from './styled';

class Read extends PureComponent {
  state = {
    settingsBar: null,
  }

  componentDidMount() {
    this.Highlight = new Highlight(document.getElementById('article'));
    this.Highlight.setMatchType('open');
  }

  onSearch = (value) => {
    const { theme, themeIndex } = this.props;
    this.Highlight.apply(value);
    
    const all = document.getElementsByClassName('mark');
    for (var i = 0; i < all.length; i++) {
      all[i].style.color = theme.colors[themeIndex].secondary;
      all[i].style.backgroundColor = theme.colors[themeIndex].primary;
    }
  }

  onClearSearch = () => {
    this.Highlight.remove();
  }

  onArticleClose = () => {
    store.remove('currentArticle');
    Router.push('/');
  }

  onSettingsOpen = (children) => {
    this.setState({
      settingsBar: children,
    });
  }

  render() {
    const { title, content } = this.props.article;
  
    return (
      <Container {...this.props}>
        <Header
          article
          onSearch={this.onSearch}
          onClearSearch={this.onClearSearch}
          onArticleClose={this.onArticleClose}
          onSettingsOpen={this.onSettingsOpen}
        />
        <SettingsBar inverted settings={this.state.settingsBar} />
        <ArticleContainer id='article' {...this.props}>
          <StyledTitle {...this.props}>
            {title}
          </StyledTitle>
          <ContentContainer {...this.props}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </ContentContainer>
        </ArticleContainer>
      </Container>
    );
  }
}

export default withTheme(withThemeIndex(withFontSize(Read)));
