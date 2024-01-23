// pages/_app.js or pages/_app.tsx

import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
