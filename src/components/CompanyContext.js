import React, { createContext, useState } from 'react';

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState('');

  return (
    <CompanyContext.Provider value={{ companyName, setCompanyName }}>
      {children}
    </CompanyContext.Provider>
  );
};
