"use client";

import React, { useEffect } from "react";
import axios from "axios";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";

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
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Provider;
