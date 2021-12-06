import { useContext, useState, createContext, ReactNode, FC } from 'react';
import { loginRequest, getUserRequest, logoutRequest } from './api';
import { deleteCookie, setCookie } from './cookies';

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

interface IProvideAuthProps {
  children: ReactNode
}

interface IAuthContextProps {
}

export const ProvideAuth: FC<IProvideAuthProps> = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

interface IAuthResponse {
  name: string,
  email: string
}

function handleError(ex: unknown): void {
  console.log((ex as Error).message);
}

interface IUserRequestResponse {
  user: { 
    name: string,
    email: string
  }
}

export function useProvideAuth() {
  const [user, setUser] = useState<IAuthResponse | null>(null);

  const getUser = async () => {
    try {
        const data: IUserRequestResponse = await getUserRequest();
        setUser({ name: data.user.name, email: data.user.email });
    }
    catch (ex){
      handleError(ex);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password);
      setCookie("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    catch (ex){
      handleError(ex);
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
      
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    } catch (ex){
      handleError(ex);
    }
  };

  return {
    user,
    getUser,
    signIn,
    signOut
  };
}