import React, { PureComponent } from 'react';
import Router from 'next/router'
import store from 'store';
import urlregex from 'url-regex';
import { withThemeIndex } from 'components/ThemeIndexProvider';
import MainInput from 'components/MainInput';
import Header from 'components/Header';
import SettingsBar from 'components/SettingsBar';
import {
  Container,
  CenterContainer,
  Subtitle,
  CubeGrid,
  Title,
  Footer,
} from './styled';

class Home extends PureComponent {
  state = {
    settingsBar: null,
    isLoading: false,
    inputError: false,
    parserError: false,
  }

  onSubmit = (urlValue) => {
    if (this.state.isLoading) {
      return;
    }

    if (urlregex({ strict: true }).test(urlValue)) {
      this.setState({ inputError: false, isLoading: true });
      fetch('/api/article/', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          action: 'extract',
          url: urlValue,
        }),
      })
      .then(res => res.json())
      .then(data => {
        store.set('currentArticle', data);
        Router.push('/read');
        this.setState({ parserError: false, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ parserError: true, isLoading: false });
      });
    } else {
      this.setState({ inputError: true, parserError: false });
    }
  }

  onSettingsOpen = (children) => {
    this.setState({
      settingsBar: children,
    });
  }

  renderSubTitle = () => {
    const { inputError, parserError, isLoading } = this.state;
    const description = 'This tool is a web reader with a clean and intuitive interface. Makes articles easy to read.';
    const iError = 'Invalid article url';
    const pError = 'Cannot parse the article in the page. Check the url or try again in a moment.';

    if (inputError) {
      return iError;
    } else if (parserError) {
      return pError;
    }
    return description
  }

  renderLoader = () => {
    return (
      <CubeGrid {...this.props}>
        <div className='sk-cube1 sk-cube'></div>
        <div className='sk-cube2 sk-cube'></div>
        <div className='sk-cube4 sk-cube'></div>
        <div className='sk-cube3 sk-cube'></div>
      </CubeGrid>
    );
  }

  render() {
    const { isLoading } = this.state;
  
    return (
      <Container {...this.props}>
        <Header onSettingsOpen={this.onSettingsOpen} />
        <SettingsBar settings={this.state.settingsBar} />
        <Title {...this.props}>EasyRead.io</Title>
        <CenterContainer>
          <MainInput
            onSubmit={this.onSubmit}
          />
          {isLoading ? this.renderLoader() : (
            <Subtitle {...this.props}>
              {this.renderSubTitle()}
            </Subtitle>
          )}
        </CenterContainer>
        <Footer {...this.props}>2019 - info@easyread.io</Footer>
      </Container>
    );
  }
}

export default withThemeIndex(Home);
