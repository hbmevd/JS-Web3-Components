// WhitelistChecker.js

import React, { useEffect, useState } from 'react';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { collection, getDocs, where, query } from '@firebase/firestore';
import { firestore } from '../firebaseConfig'; // Ensure this import is correct
import styles from '../styles/Home.module.css';

const WhitelistChecker = () => {
  const [whitelistStatus, setWhitelistStatus] = useState(null);
  const [eligibleMints, setEligibleMints] = useState(0);
  const connectedAddress = useAddress();
  const { disconnect } = useDisconnect();

  const fetchData = async () => {
    try {
      const whitelistCollection = collection(firestore, 'whitelist');

      const q = query(whitelistCollection, where('address', '==', connectedAddress));
      const snapshot = await getDocs(q);

      if (snapshot.size > 0) {
        const foundEntry = snapshot.docs[0].data();
        setWhitelistStatus(true);
        setEligibleMints(foundEntry.mintsEligible);
      } else {
        setWhitelistStatus(false);
        setEligibleMints(0);
      }
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      setWhitelistStatus(false);
      setEligibleMints(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [connectedAddress]);

  useEffect(() => {
    fetchData();
  }, [disconnect]); // Run the check when disconnecting the wallet

  const sendToWebflowUI = (id, message) => {
    window.parent.postMessage({ id, message }, '*');
  };

  const handleJoinDiscord = () => {
    // Replace this link with your Discord server invite link
    window.open('https://discord.gg/HrGZ2cmHK8', '_blank');
  };

  useEffect(() => {
    // Send messages to Webflow UI when data changes
    sendToWebflowUI('welcomeMessage', 'Welcome to the Jungle, Bully');
    sendToWebflowUI('eligibleMessage', 'You are eligible for');
    sendToWebflowUI('eligibleMints', eligibleMints.toString());
    sendToWebflowUI('mintsMessage', 'mints');
  }, [whitelistStatus, eligibleMints]);

  return (
    <div className={styles['whitelist-container']}>
      <div>
        {connectedAddress && whitelistStatus !== null && (
          <div>
            {whitelistStatus ? (
              <><><><div className={styles['welcome-message']}>
                <p>Welcome to the Jungle, <b>Bully.</b></p>
              </div>
                <div className={styles['welcome-message']}>
                  <p>You are eligible for</p>
                </div></><div className={styles['mints-count']}>
                  <p>50</p>
                </div></>
                <div className={styles['welcome-message']}>
                  <b><p>FREE Evolution 1 NFTs</p></b>
                </div></>
                
            ) : (
              <div className={styles['error-message']}>
                <p>This isn&apos;t your time.</p>
                <p>Find out how to join us in Discord...</p>
                <button className={styles['discord-button']} onClick={handleJoinDiscord}>
                  Join Discord to whitelist
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhitelistChecker;
