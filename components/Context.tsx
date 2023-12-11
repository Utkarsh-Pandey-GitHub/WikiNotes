'use client'
// MyContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Define the type for your context
interface MyContextProps {
  // Define your context properties here
  myValue: boolean;
  setMyValue: (value: any) => any;
}

// Create the context
const MyContext = createContext<MyContextProps | undefined>(undefined);

// Create a provider component
const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [myValue, setMyValue] = React.useState<boolean>(false);

  return (
    <MyContext.Provider value={{ myValue, setMyValue }}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook for using the context
const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

export { MyContextProvider, useMyContext };
