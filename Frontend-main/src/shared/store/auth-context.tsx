import React, { useState, createContext, useCallback } from 'react';
import { IUser } from '../interfaces/interfaces';
import jwt_decode from 'jwt-decode';

const initialUser: IUser = {
  email: '',
  _id: '',
  name: '',
  roles: [],
  isValidated: false,
  image: '',
  courses: [],
  assessment: [],
};

const AuthContext = createContext({
  token: '',
  isSignedIn: false,
  user: initialUser,
  signin: (token: string, user: IUser) => {
    /**/
  },
  signout: () => {
    /**/
  },
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(initialUser);

  const signinHandler = useCallback((token: string, user: IUser) => {
    setToken(token);
    setUser({
      email: user.email,
      _id: user._id,
      name: user.name,
      roles: user.roles,
      isValidated: user.isValidated,
      image: user.image,
      courses: user.courses,
      assessment: user.assessment,
    });
  }, []);

  const signoutHandler = () => {
    setToken('');
    setUser(initialUser);
  };

  const contextValue = {
    token: token,
    user: user,
    isSignedIn: !!token,
    signin: signinHandler,
    signout: signoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
