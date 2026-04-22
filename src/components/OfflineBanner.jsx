import { useOnlineStatus } from "../hooks";

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-500 text-white text-center  shadow-md">
      You are offline. Please check your internet connection.
    </div>
  );
};
