"use client"

import React, { useState, useEffect, createContext, useContext, PropsWithChildren } from "react";

type AuthInfo = {
  email: string;
}

type AuthInfoState = {
  authInfo: AuthInfo;
  setAuthInfo(authInfo: AuthInfo): void;
}

const getStorageData = (): AuthInfo => {
  if(typeof window!= "undefined" && window.localStorage) {
    const storedRef: string | null = window.localStorage.getItem("authInfo");
    if(typeof storedRef == "string") {
      return JSON.parse(storedRef);
    }
  }
  return {
    email: "",
  }
}

const AuthContext = createContext<AuthInfoState |  null>(null);

const useAuthInfo = () : AuthInfoState => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("Please use AuthProvider in parent component");
  }

  return context;
}

export const AuthProvider = (porps: PropsWithChildren) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    email: "",
  });

  useEffect(() => {
    setAuthInfo(getStorageData());
  }, []);

  useEffect(() => {
    window.localStorage.setItem("authInfo", JSON.stringify(authInfo));
  }, [authInfo]);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      { porps.children }
    </AuthContext.Provider>
  )
}

export default useAuthInfo;