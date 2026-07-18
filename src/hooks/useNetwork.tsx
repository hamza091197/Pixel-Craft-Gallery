import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * Returns real-time network connectivity status.
 * - null  → initial state (no reading yet, avoids flash of offline banner on startup)
 * - true  → online
 * - false → offline
 */
export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // Both isConnected AND isInternetReachable must be true to count as online
      const status = !!state.isConnected && !!state.isInternetReachable;
      setIsConnected(status);
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  return isConnected;
};
