import { useEffect } from "react";
import { axiosPrivate } from "../../Api/Axios";
import UseRefreshToken from "../AuthHooks/useRefreshToken";
import useAuth from "../zustandStore/useAuth";

const useAxiosPrivate = () => {
  const auth = useAuth();

  const refresh = UseRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;

        if (err?.response?.status === 403 && !err.config._isRetry) {
          err.config._isRetry = true;

          const newAccessToken = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        } else {
          return Promise.reject(err);
        }
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
