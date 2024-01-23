// MyApp.js

import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import React from 'react';
import WhitelistConnector from './whitelistConnector';
import '../styles/gbstyles.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="9b406d6af880a571a409bc229085bdc5"
    >
      {/* Wrap your app content with WhitelistConnector */}
      <WhitelistConnector>
        <Component {...pageProps} />
      </WhitelistConnector>

    </ThirdwebProvider>
  );
}

export default MyApp;