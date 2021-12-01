import { useContext, useState, createContext } from 'react';
import { loginRequest, getUserRequest, logoutRequest } from './api';
import { deleteCookie, setCookie } from './cookies';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
        const data = await getUserRequest();
        setUser({ name: data.user.name, email: data.user.email });
    }
    catch (ex){
      console.log(ex.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const data = await loginRequest(email, password);
      setCookie("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    catch (ex){
      console.log(ex.message);
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
      
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } catch (ex){
      console.log(ex.message);
    }
  };

  return {
    user,
    getUser,
    signIn,
    signOut
  };
}