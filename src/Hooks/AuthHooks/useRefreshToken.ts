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
        response.data.image,
        response.data.userID,
      );

      // Return the new access token
      return response.data.accessToken;
    } catch (error) {
      auth.onLogout();

      return null;
    }
  };

  return refresh;
};

export default UseRefreshToken;
