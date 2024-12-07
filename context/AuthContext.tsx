import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { API_URL } from "@/constants";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean;
    role: string | null;
    verified: boolean | null;
  };
  onRegister?: (
    email: string,
    password: string,
    username: string,
    baseUrl: string,
    isOrganizer: boolean
  ) => Promise<any>;
  onLogin?: ({ email, password }: any) => Promise<any>;
  onLogout?: () => Promise<any>;
  onForgetPassword?: (email: string, baseUrl: string) => Promise<any>;
  onResetPassword?: (reset_token: string, new_password: string) => Promise<any>;
  onVerifyPassword?: (verify_token: string) => Promise<any>;
  authLoading?: boolean;
}

const TOKEN_KEY = "JWT_TOKEN";
const ROLE_KEY = "ROLE";

const VERIFIED_KEY = "VERIFY";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
    role: string | null;
    verified: boolean | null;
  }>({ token: null, authenticated: false, role: null, verified: null });
  const [authLoading, setAuthLoading] = useState(true);

  //Loading the token from storage on first time startup.
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("Token Found: ", token ? "Yes" : "No");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const role = await SecureStore.getItemAsync(ROLE_KEY);
        const temp = await SecureStore.getItemAsync(VERIFIED_KEY);
        console.log("Verified:", temp ? true : false);
        let verified = false;
        if (temp && temp.length !== 0) verified = true;

        console.log("Role: ", role);

        setAuthState({
          token: token,
          authenticated: true,
          role: role,
          verified: verified,
        });
      }

      setAuthLoading(false);
    };
    if (Platform.OS !== "web") loadToken();
  }, []);

  const register = async (
    email: string,
    password: string,
    username: string,
    baseUrl: string,
    isOrganizer: boolean
  ) => {
    try {
      const location = "Lahore,Pakistan";
      return await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        username,
        baseUrl,
        isOrganizer,
        location,
      });
    } catch (e: any) {
      console.log(e);

      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const forgetPassword = async (email: string, baseUrl: string) => {
    try {
      return await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
        baseUrl,
      });
    } catch (e: any) {
      console.log(e.message);
      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const resetPassword = async (reset_token: string, new_password: string) => {
    try {
      return await axios.put(`${API_URL}/auth/reset-password`, {
        reset_token,
        new_password,
      });
    } catch (e: any) {
      console.log(e.message);
      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const verify = async (verify_token: string) => {
    try {
      console.log("Sending Request: Auth Verify");
      await axios.put(`${API_URL}/auth/verify`, {
        verify_token,
      });
      console.log("Request Successful: Auth Verify");
      try {
        await SecureStore.setItemAsync(VERIFIED_KEY, "1");
      } catch (e) {
        console.log(e);
      }
      return "Successful";
    } catch (e: any) {
      console.log(e.message);
      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const login = async ({ email, password }: any) => {
    console.log("email", email);
    console.log("password", password);
    const result = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    // console.log("Login Result: ", result);

    setAuthState({
      token: result.data.jwtToken,
      authenticated: true,
      role: result.data.result.roleName,
      verified: result.data.result.isVerified,
    });

    axios.defaults.headers.common["Authorization"] =
      `Bearer ${result.data.jwtToken}`;
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.jwtToken);
      await SecureStore.setItemAsync(ROLE_KEY, result.data.result.roleName);
      if (result.data.result.isVerified)
        await SecureStore.setItemAsync(VERIFIED_KEY, "1");
      console.log("Verified: ", result.data.result.isVerified);
    } catch (e: any) {
      console.log(e.message);
    }

    return result.data; //Return it to check rolename afterwards.
  };

  const logout = async () => {
    try {
      //Delete the token from storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(ROLE_KEY);
      await SecureStore.deleteItemAsync(VERIFIED_KEY);
      // Update HTTP Headers
      axios.defaults.headers.common["Authorization"] = "";
      // Reset auth state
      setAuthState({
        token: null,
        authenticated: false,
        role: null,
        verified: null,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msgs };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onForgetPassword: forgetPassword,
    onResetPassword: resetPassword,
    onVerify: verify,
    authState,
    authLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
