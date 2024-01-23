// pages/_app.js or pages/_app.tsx

import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="9b406d6af880a571a409bc229085bdc5"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
