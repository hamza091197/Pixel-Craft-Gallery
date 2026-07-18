import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

/**
 * Syncs TanStack Query's online status with real device connectivity.
 * Without this, queries won't auto-retry/refetch when the device comes back online.
 * Called once at app startup in App.tsx.
 */
export const setupReactQueryOnlineManager = () => {
  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      const isOnline = !!state.isConnected && !!state.isInternetReachable;

      setOnline(isOnline);
    });
  });
};
