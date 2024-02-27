import { useEffect, useState } from "react";
import useAuth from "../Hooks/zustandStore/useAuth";
import UseRefreshToken from "../Hooks/AuthHooks/useRefreshToken";
import loader from "../Assets/fade-stagger-squares.svg";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RegisterModal from "../Components/Modals/RegisterModal";
import OtpModal from "../Components/Modals/OtpModal";
import LoginModal from "../Components/Modals/LoginModal";

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
        <div className=" flex h-screen  w-full items-center justify-center">
          <img src={loader} alt="" height={100} width={100} />{" "}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;
