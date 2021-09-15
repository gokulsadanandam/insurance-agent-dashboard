import React, { FC } from 'react';
import { Routes } from './Routes';
import { useReducer } from 'react';
import StoreContext from './+state/context'
import { initialState, reducer } from './+state/reducer'
import { ProviderStateInterface } from './+state/context';

export const  App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const providerState: ProviderStateInterface = {
    state,
    dispatch
  }
  return(
    <StoreContext.Provider value={providerState}>
      <Routes />
    </StoreContext.Provider>
  )
}

export default App;
