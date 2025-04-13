import React from "react";
import { ScaleLoader } from "react-spinners";

const ThemeSuspense = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <ScaleLoader color="#10B981" /> {/* Tailwind Emerald-500 HEX */}
      </div>
    </>
  );
};

export default ThemeSuspense;
