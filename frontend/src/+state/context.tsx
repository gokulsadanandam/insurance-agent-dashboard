import React from 'react';
import {appState} from './reducer';

export interface ProviderStateInterface {
  state: appState;
  dispatch: React.Dispatch<{
      type: string;
      payload?: any;
  }>;
}

const StoreContext = React.createContext<ProviderStateInterface>({} as ProviderStateInterface);

export function useStoreContext() {
  return React.useContext<ProviderStateInterface>(StoreContext);
}

export default StoreContext;