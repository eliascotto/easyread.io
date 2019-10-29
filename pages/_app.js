import App from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import ThemeIndexProvider from 'components/ThemeIndexProvider';
import FontSizeProvider from 'components/FontSizeProvider';
import { getTheme } from 'theme';

import 'styles/normalize.css';
import 'styles/styles.css';

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={getTheme()}>
        <ThemeIndexProvider>
          <FontSizeProvider>
            <Component {...pageProps} />
          </FontSizeProvider>
        </ThemeIndexProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
