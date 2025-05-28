import { FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import { AuthModel, UserModel } from './_models';
import * as authHelper from './AuthHelpers';
import { getUserByToken } from './_requests';
import { WithChildren } from '../../../../_metronic/helpers';

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

const initAuthContextState: AuthContextProps = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextState);

const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
      localStorage.setItem('access_token', auth.api_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.api_token}`;
    } else {
      authHelper.removeAuth();
      localStorage.removeItem('access_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      if (auth?.api_token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.api_token}`;
        try {
          const { data } = await getUserByToken(auth.api_token);
          
          setCurrentUser(data.user);


        } catch (error) {
          console.error('Token verification failed', error);
          logout();
        }
      } else {
        logout();
      }
      setShowSplashScreen(false);
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showSplashScreen) {
    return <LayoutSplashScreen />;
  }

  return <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
