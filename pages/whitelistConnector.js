// WhitelistConnector.js

import React, { useState, useEffect } from 'react';
import { ThirdwebProvider, ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';
import WhitelistChecker from './whitelistChecker';

const WhitelistConnector = () => {
  const [isConnected, setIsConnected] = useState(false);
  const connectedAddress = useAddress();
  const disconnect = useDisconnect(); // Destructure disconnect directly

  const handleConnectWallet = () => {
    // Update the state to indicate a successful connection
    setIsConnected(true);
  };

  const handleDisconnectWallet = () => {
    // Disconnect the wallet and update the state
    // Note: The disconnect logic depends on your specific use case or the Thirdweb API
    // You may need to use a different method provided by Thirdweb for disconnecting
    // This is a placeholder, and you should replace it with the actual disconnect logic
    disconnect();
    setIsConnected(false);
  };

  // Check for an existing connection on page load
  useEffect(() => {
    // Use the connectedAddress to check if the wallet is already connected
    if (connectedAddress) {
      setIsConnected(true);
    }
  }, [connectedAddress]); // Dependency array ensures this effect runs whenever connectedAddress changes

  return (
    <ThirdwebProvider
      // Add your ThirdwebProvider props as needed
    ><ConnectWallet/>
      <div>
        {/* Display the ConnectWallet component only if not connected */}
        {!isConnected && (
          <ConnectWallet
            onConnect={handleConnectWallet}
          />
        )}

        {/* Display the WhitelistChecker component when connected */}
        {isConnected && <WhitelistChecker />}
      </div>
    </ThirdwebProvider>
  );
};

export default WhitelistConnector;
