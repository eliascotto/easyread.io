import App from 'next/app';
import Head from 'next/head';
import ReactGA from 'react-ga';
import { ThemeProvider } from 'emotion-theming';
import ThemeIndexProvider from 'components/ThemeIndexProvider';
import FontSizeProvider from 'components/FontSizeProvider';
import { getTheme } from 'theme';

import 'styles/normalize.css';
import 'styles/styles.css';

class MyApp extends App {
  componentDidMount() {
    ReactGA.initialize(process.env.GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={getTheme()}>
        <ThemeIndexProvider>
          <FontSizeProvider>
            <Head>
              <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
              <link rel="manifest" href="/favicon/site.webmanifest" />
            </Head>
            <Component {...pageProps} />
          </FontSizeProvider>
        </ThemeIndexProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
