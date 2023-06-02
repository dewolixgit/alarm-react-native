import * as React from 'react';

import { DisabledAlarmsStore } from './DisabledAlarmsStore';

type DisabledAlarmsStoreContextType = DisabledAlarmsStore | null;

export const DisabledAlarmsStoreContext =
  React.createContext<DisabledAlarmsStoreContextType>(null);

export const DisabledAlarmsStoreContextProvider =
  DisabledAlarmsStoreContext.Provider;

export const useDisabledAlarmsStore = () =>
  React.useContext(DisabledAlarmsStoreContext);
