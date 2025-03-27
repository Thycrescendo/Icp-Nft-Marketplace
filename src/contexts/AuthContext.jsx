import { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      
      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        setPrincipal(client.getIdentity().getPrincipal().toString());
      }
    };
    
    initializeAuth();
  }, []);

  const login = async () => {
    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: process.env.DFX_NETWORK === "ic" 
          ? "https://identity.ic0.app" 
          : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
        onSuccess: async () => {
          setIsAuthenticated(true);
          const principal = authClient.getIdentity().getPrincipal().toString();
          setPrincipal(principal);
          resolve(principal);
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  const logout = async () => {
    await authClient.logout();
    setIsAuthenticated(false);
    setPrincipal(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, principal, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);