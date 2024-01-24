// WhitelistConnector.js

import React, { useState, useEffect } from 'react';
import { ThirdwebProvider, ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';
import WhitelistChecker from './whitelistChecker';
import styles from '../styles/Home.module.css';

const WhitelistConnector = () => {
  const [isConnected, setIsConnected] = useState(false);
  const connectedAddress = useAddress();
  const disconnect = useDisconnect(); // Destructure disconnect directly

  const handleConnectWallet = () => {
    // Update the state to indicate a successful connection
    setIsConnected(true);
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
    ><div className={styles['whitelist-container']}>
        <ConnectWallet/>
        </div>
      <div>
        {/* Display the ConnectWallet component only if not connected */}
          
      

        {/* Display the WhitelistChecker component when connected */}
        {isConnected && <WhitelistChecker />}
      </div>
    </ThirdwebProvider>
  );
};

export default WhitelistConnector;
