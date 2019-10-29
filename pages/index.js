import React, { PureComponent, Fragment } from 'react';
// import dynamic from 'next/dynamic';
import Head from 'next/head';
import HomePage from 'components/Pages/Home';

// DISABLE SSR with dynamic import
//
// const HomePage = dynamic(
//   () => import('components/Pages/Home'),
//   { ssr: false }
// )

class Home extends PureComponent {
  render() {
    return (
      <Fragment>
        <Head>
          <title>EasyRead.io - Web reader for article</title>
        </Head>
        <style jsx global>{`
          html,body,#__next{height:100%}
        `}</style>
        <HomePage />
      </Fragment>
    );
  }
}

export default Home;
