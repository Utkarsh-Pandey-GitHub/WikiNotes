'use client'
// MyContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Define the type for your context
interface MyContextProps {
  // Define your context properties here
  user: Object|any|undefined;
  setUser: (value: any) => any;
}


const MyUserContext = createContext<MyContextProps | undefined>(undefined);


const MyUserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<any>(null);

  return (
    <MyUserContext.Provider value={{ user, setUser }}>
      {children}
    </MyUserContext.Provider>
  );
};

// custom hook/function for using the context
const useCurrUser = () => {
  const context = useContext(MyUserContext);
//   if (!context) {
//     throw new Error('useMyContext must be used within a MyContextProvider');
//   }
  return context;
};

export { MyUserContextProvider, useCurrUser };
