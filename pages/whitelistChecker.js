// WhitelistChecker.js

import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { collection, getDocs, where, query } from '@firebase/firestore';
import { firestore } from '../firebaseConfig'; // Ensure this import is correct

const WhitelistChecker = () => {
  const [whitelistStatus, setWhitelistStatus] = useState(null);
  const [eligibleMints, setEligibleMints] = useState(0);
  const [previewData, setPreviewData] = useState('');
  const connectedAddress = useAddress();

  const fetchData = async () => {
    try {
      const whitelistCollection = collection(firestore, 'whitelist'); // Replace with your Firestore collection name

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

  const handleCheckWhitelist = () => {
    fetchData();
  };

  const handleGetPreviewData = async () => {
    try {
      const whitelistCollection = collection(firestore, 'whitelist'); // Replace with your Firestore collection name

      const snapshot = await getDocs(whitelistCollection);
      const data = snapshot.docs.map(doc => doc.data());

      setPreviewData(JSON.stringify(data.slice(0, 10), null, 2));
    } catch (error) {
      console.error('Error fetching preview data from Firestore:', error);
      setPreviewData('');
    }
  };

  return (
    <div>
      <div>
        {whitelistStatus !== null && (
          <div>
            {whitelistStatus ? (
              <div>
                <p>Congrats, you are whitelisted!</p>
                <p>Available mints: {eligibleMints}</p>
              </div>
            ) : (
              <p>Sorry, you are not whitelisted.</p>
            )}
          </div>
        )}
      </div>

      <button onClick={handleCheckWhitelist}>Check Whitelist</button>

      <div>
        <button onClick={handleGetPreviewData}>Get Data Preview</button>
        <textarea
          rows="10"
          cols="50"
          placeholder="Preview Data will be shown here"
          value={previewData}
          readOnly
        />
      </div>
    </div>
  );
};

export default WhitelistChecker;
