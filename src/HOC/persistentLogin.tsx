import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import UseRefreshToken from "../Hooks/useRefreshToken";
import loader from "../Assets/fade-stagger-squares.svg";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
      {isLoading ? (
        <div className=" flex items-center  justify-center h-screen w-full">
          <img src={loader} alt="" height={100} width={100} />{" "}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;
