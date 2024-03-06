import { useEffect, useState } from "react";
import useAuth from "../Hooks/zustandStore/useAuth";
import UseRefreshToken from "../Hooks/AuthHooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterModal from "../Components/Modals/RegisterModal";
import OtpModal from "../Components/Modals/OtpModal";
import LoginModal from "../Components/Modals/LoginModal";
import PageLoader from "../Components/Loaders/pageLoader";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  let refresh = UseRefreshToken();

  let auth = useAuth();
  const accessToken = auth.accessToken;

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? refreshAccessToken() : setIsLoading(false);
  }, [accessToken]);

  return (
    <>
      <Toaster position="bottom-right" />
      <RegisterModal />
      <OtpModal />
      <LoginModal />
      {isLoading ? (
       
       <PageLoader/>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;
