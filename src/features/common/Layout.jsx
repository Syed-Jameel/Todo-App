import React from "react";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <div className="min-h-full">
      <header className=" bg-[#051937] shadow-lg z-50 fixed top-0 left-0 right-0">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.3, y: -50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
            <h1 className="text-xl lg:text-3xl drop-shadow-lg font-bold text-center tracking-tight text-gray-100 hover:text-gray-200 py-2 ">Todo App</h1>
          </motion.div>
        </div>
      </header>
      <main className="bg-gray-100">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
// bg-[#b4eb08]
