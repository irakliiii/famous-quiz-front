import { createContext, useEffect, useState } from "react";

export const AdminAuthContext = createContext({ type: "answer", showStart: true });

export const AdminAuthContextProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('authData'));
    if (data?.token) {
      setData(data);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, data, setData }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
