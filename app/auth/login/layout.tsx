"use client";

import React from "react";

const LoginLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <header className="bg-blue-600 w-full py-4 text-center text-white">
        <h1 className="text-2xl">My Application</h1>
      </header>
      <main className="flex w-full flex-grow items-center justify-center">
        {children}
      </main>
      <footer className="bg-blue-600 w-full py-4 text-center text-white">
        <p>&copy; 2024 My Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginLayout;
