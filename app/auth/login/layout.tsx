"use client";

import React from "react";

const LoginLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <main className="flex w-full flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default LoginLayout;
