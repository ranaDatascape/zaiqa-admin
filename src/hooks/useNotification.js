import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import io from "socket.io-client";

const useNotification = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [updated, setUpdated] = useState(false);

  // useEffect(() => {
  //   setSocket(io(import.meta.env.VITE_APP_API_SOCKET_URL));
  //   // setSocket(io("https://kachabazar-backend-theta.vercel.app"));
  // }, []);

  // useEffect(() => {
  //   // Listen for the 'notification' event from the server
  //   socket?.on("notification", (notification) => {
  //     // Update data in real-time here
  //     console.log("notification", notification);
  //     if (notification?.option === "globalSetting") {
  //       dispatch(removeSetting("globalSetting"));
  //       const globalSettingData = {
  //         ...notification.globalSetting,
  //         name: "globalSetting",
  //       };
  //       dispatch(addSetting(globalSettingData));
  //     }
  //     // if(notification?.option === 'storeCustomizationSetting'){

  //     // }
  //   });

  //   return () => {
  //     // Disconnect the socket when the component unmounts
  //     socket?.disconnect();
  //   };
  // }, [socket]);

  return {
    socket,
    updated,
    setUpdated,
  };
};

export default useNotification;
