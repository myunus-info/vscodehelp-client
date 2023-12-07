import { createContext, useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (user, token, expirationTime) => {},
  logout: () => {},
  user: {},
});

const retrieveStoredToken = () => {
  const storedToken = sessionStorage.getItem('token');
  const storedExpirationDate = sessionStorage.getItem('expirationTime');
  const remainingTime = new Date(storedExpirationDate).getTime() - Date.now();

  if (remainingTime <= 60000) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = props => {
  const tokenData = retrieveStoredToken();
  const [user, setUser] = useState({});

  let initialToken;
  if (tokenData) initialToken = tokenData.token;

  const [token, setToken] = useState(initialToken);
  const isUserLoggedIn = !!token;
  console.log(isUserLoggedIn, token);

  const logoutHandler = useCallback(() => {
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (user, token, expirationTime) => {
    setUser(user);
    setToken(token);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('expirationTime', expirationTime);
    const remainingTime = new Date(expirationTime).getTime() - Date.now();
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  }, [logoutHandler, tokenData]);

  const contextValue = {
    token,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
