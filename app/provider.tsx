import React from "react";
import Header from "./_components/Header";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Provider;
