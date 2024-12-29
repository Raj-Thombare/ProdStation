import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='p-5 sm:px-10 md:px-36 lg:px-48'>{children}</div>;
};

export default RootLayout;
