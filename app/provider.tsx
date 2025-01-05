"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { CartContextProvider } from "./_context/CartContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    user && checkIsNewUser();
  }, [user]);

  const checkIsNewUser = async () => {
    await axios.post("/api/user", {
      user: user,
    });
  };

  return (
    <>
      <CartContextProvider>
        <Header />
        <div>{children}</div>
      </CartContextProvider>
    </>
  );
};

export default Provider;
