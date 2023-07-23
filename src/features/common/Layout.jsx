import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-full">
      <header className="bg-gray-700 hover:bg-gray-800  shadow-lg z-50 fixed top-0 left-0 right-0">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-3xl drop-shadow-lg font-bold text-center tracking-tight text-gray-200 hover:text-gray-100 py-2 ">Todo App</h1>
        </div>
      </header>
      <main className="bg-gray-100">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
