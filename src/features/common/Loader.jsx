import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <RotatingLines strokeColor="gray" strokeWidth="4" animationDuration="0.75" width="40" visible={true} />
    </div>
  );
};

export default Loader;
