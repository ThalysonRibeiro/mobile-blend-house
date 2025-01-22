import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SigninProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
}

type AuthProviderProps = {
  children: ReactNode
}

type SigninProps = {
  email: string;
  password: string;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  });

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.email;

  useEffect(() => {
    async function getUser() {
      // pegasr os dados salvo do user
      const userInfo = await AsyncStorage.getItem('@blend-house');
      const hasUser: UserProps = JSON.parse(userInfo || '{}');

      // verifica se recebeu as informaçoes

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        })
      }
      setLoading(false);
    }
    getUser();
  }, [])

  async function signIn({ email, password }: SigninProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/session', {
        email,
        password,
      });


      const { id, name, token } = response.data;

      const data = {
        ...response.data
      };

      await AsyncStorage.setItem('@blend-house', JSON.stringify(data));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);

    } catch (error) {
      console.log('erro ao acessar', error);
      setLoadingAuth(false);
    }

  }

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser({
          id: '',
          name: '',
          email: '',
          token: ''
        })
      })
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      signIn,
      loading,
      loadingAuth,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
