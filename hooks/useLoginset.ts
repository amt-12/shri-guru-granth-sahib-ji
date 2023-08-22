import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { loginFlag } from "../store/auth";
import { useAtom } from "jotai";

export const useLoginset = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginFlag);
  useEffect(() => {
    AsyncStorage.getItem("authToken").then((a) => {
      if (a) {
        setIsLoggedIn(true);
      }
    });

    return () => {};
  }, []);

  return {
    isLoggedIn,
    setIsLoggedIn,
  };
};
