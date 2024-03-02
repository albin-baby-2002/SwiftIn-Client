import toast from "react-hot-toast";
import { Axios } from "../../Api/Axios";
import useAuth from "../zustandStore/useAuth";

const UseRefreshToken = () => {
  const auth = useAuth();

  const refresh = async () => {
    try {
      // Make a request to refresh the token
      const response = await Axios.get("/refreshToken", {
        withCredentials: true,
      });

      // Update authentication state with the new token
      auth.setAuth(
        response.data.accessToken,
        response.data.roles,
        response.data.user,
        response.data.image
      );

      // Return the new access token
      return response.data.accessToken;
    } catch (error) {
      auth.onLogout();

      console.error("Error refreshing token:", error);

      return null;
    }
  };

  return refresh;
};

export default UseRefreshToken;
