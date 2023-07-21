import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-full">
      <header className="bg-white shadow z-50 fixed top-0 left-0 right-0">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <h1 className="text-md md:text-2xl font-bold text-center tracking-tight text-gray-900 lg:py-4 ">Todo App</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
