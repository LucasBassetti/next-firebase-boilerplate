'use client';

import * as api from '@/api/data';
import React, { createContext, useCallback, useContext, useState } from 'react';

export type DataItem = api.DataItem;

export type DataContextProps = {
  data: api.DataItem[];
  subscribeToData: () => void;
  createDataItem: (email: string) => void;
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

type DataProviderProps = {
  children: React.ReactNode;
};

export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<api.DataItem[]>([]);

  const subscribeToData = useCallback(() => {
    api.subscribeToDataEvent({
      success: setData,
      error: console.log,
    });

    return () => {
      api.unsubscribeToDataEvent(() => {
        setData([]);
      });
    };
  }, []);

  const createDataItem = useCallback((email: string) => {
    api.createDataItem({
      email,
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        subscribeToData,
        createDataItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
}
