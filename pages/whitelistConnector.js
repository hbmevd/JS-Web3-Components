// WhitelistConnector.js

import React, { useState } from 'react';
import { ThirdwebProvider, ConnectWallet } from '@thirdweb-dev/react';
import WhitelistChecker from './whitelistChecker';

const WhitelistConnector = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    // Update the state to indicate a successful connection
    setIsConnected(true);
  };

  return (
    <ThirdwebProvider
      // Add your ThirdwebProvider props as needed
    >
      <div>
        {!isConnected ? (
          <ConnectWallet
            dropdownPosition={{
              side: 'bottom',
              align: 'center',
            }}
            // Attach the handleConnectWallet callback to the onConnect event
            onConnect={handleConnectWallet}
          />
        ) : (
          // If connected, display the WhitelistChecker component
          <WhitelistChecker />
        )}
      </div>
    </ThirdwebProvider>
  );
};

export default WhitelistConnector;
