import React, { useEffect, useState } from "react";
import useGetCData from "@/hooks/useGetCData";
import NotFoundPage from "@/components/common/NotFoundPage";

const Main = ({ children }) => {
  const { path, accessList } = useGetCData();
  const [showNotFound, setShowNotFound] = useState(false);
  // if (!accessList?.includes(path)) {
  //   return <NotFoundPage />;
  // }

  useEffect(() => {
    if (!accessList?.includes(path)) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 2000); // 3 seconds delay

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [path, accessList]);

  if (!accessList?.includes(path) && showNotFound) {
    return <NotFoundPage />;
  }

  return (
    <main className="h-full overflow-y-auto">
      <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
        {children}
      </div>
    </main>
  );
};

export default Main;
