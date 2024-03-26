import { getsendLocationToUser } from '@/storage/asyncstorage';
import React, { useState, useEffect } from 'react';

const useLocationStatus = () => {
  const [locationOn, setLocationOn] = useState(false);

  useEffect(() => {
    const fetchSentLocation = async () => {
      const sent = await getsendLocationToUser();
      setLocationOn(sent);
    };

    fetchSentLocation();
  }, []);

  return locationOn;
};

export default useLocationStatus;
