import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

enum Roles {}

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean;
    role: string | null;
  };
  onRegister?: (
    email: string,
    password: string,
    username: string,
    baseUrl: string,
    isOrganizer: boolean
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  authLoading?: boolean;
}
const TOKEN_KEY = "JWT_TOKEN";
const ROLE_KEY = "ROLE";
export const API_URL = "http://192.168.1.130:3001/api";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
    role: string | null;
  }>({ token: null, authenticated: false, role: null });
  const [authLoading, setAuthLoading] = useState(true);

  //Loading the token from storage on first time startup.
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      // console.log("stored:", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const role = await SecureStore.getItemAsync(ROLE_KEY);
        // console.log("Role: ", role);

        setAuthState({
          token: token,
          authenticated: true,
          role: role,
        });
      }

      setAuthLoading(false);
    };
    loadToken();
  }, []);

  const register = async (
    email: string,
    password: string,
    username: string,
    baseUrl: string,
    isOrganizer: boolean
  ) => {
    try {
      return await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        username,
        baseUrl,
        isOrganizer,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // console.log("Login Result: ", result);

      setAuthState({
        token: result.data.jwtToken,
        authenticated: true,
        role: result.data.roleName,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result.data.token}`;
      try {
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.jwtToken);
        await SecureStore.setItemAsync(ROLE_KEY, result.data.result.roleName);
        console.log("JWT Token: ", result.data.jwtToken);
      } catch (e: any) {
        console.log(e.message);
      }

      return result; //Return it to whoever needs it. (idk who will need it but we never know.)
    } catch (e: any) {
      console.log(e.message);
      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const logout = async () => {
    try {
      //Delete the token from storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      // Update HTTP Headers
      axios.defaults.headers.common["Authorization"] = "";
      // Reset auth state
      setAuthState({
        token: null,
        authenticated: false,
        role: null,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    authLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
