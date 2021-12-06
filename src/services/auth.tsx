import { useContext, useState, createContext, ReactNode, FC } from 'react';
import { loginRequest, getUserRequest, logoutRequest } from './api';
import Cookie from 'js-cookie';

const defaultAuthContextProps = {
  user: null,
  getUser: async () => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {}
};

const AuthContext = createContext<IAuthContextProps>(defaultAuthContextProps);

interface IProvideAuthProps {
  children: ReactNode
}

type TSignInFunc = (email: string, password: string) => Promise<void>;
type TSignOutFunc = () => Promise<void>;
type TGetUserFunc = () => Promise<void>;

interface IUser {
  name: string,
  email: string
}

interface IAuthContextProps {
  user: IUser | null,
  getUser: TGetUserFunc,
  signIn: TSignInFunc,
  signOut: TSignOutFunc
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
      Cookie.set("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    catch (ex){
      handleError(ex);
    }
  };

  const signOut = async () => {
    try {
      await logoutRequest();
      
      Cookie.remove("accessToken");
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