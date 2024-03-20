import { Axios } from "../../Api/Axios";
import { useGoogleLogin } from "@react-oauth/google";
import useRegisterModal from "../zustandStore/useRegisterModal";
import toast from "react-hot-toast";
import useAuth from "../zustandStore/useAuth";
import useLoginModal from "../zustandStore/useLoginModal";
import { GOOGLE_AUTH_URL } from "../../Api/EndPoints";
import { TGoogleAuthResponse } from "../../Types/GeneralTypes/apiResponseTypes";
import { AxiosError } from "axios";
import { STATUS_CODES } from "../../Enums/statusCodes";

const UseGoogleLogin = () => {
  const registerModalState = useRegisterModal();

  const LoginModalState = useLoginModal();

  const auth = useAuth();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      try {
        const res = await Axios.post<TGoogleAuthResponse>(
          GOOGLE_AUTH_URL,
          { code: response.code },
          { withCredentials: true },
        );

        auth.setAuth(
          res.data.accessToken,
          res.data.roles,
          res.data.user,
          res.data.image,
          res.data.userID,
        );

        if (registerModalState.isOpen) {
          registerModalState.onClose();
        } else if (LoginModalState.isOpen) {
          LoginModalState.onClose();
        }

        let message = `Welcome to SwiftIn ${res.data.user}`;

        toast.success(message);
      } catch (err) {
        if (!(err instanceof AxiosError)) {
          toast.error("No Server Response");
        } else if (err.response?.status === STATUS_CODES.BAD_REQUEST) {
          toast.error(err.response.data.message);
        } else if (
          err.response?.status === STATUS_CODES.INTERNAL_SERVER_ERROR
        ) {
          toast.error("Oops! Something went wrong. Please try again later.");
        } else {
          toast.error("Failed to disapprove");
        }
      }
    },
    onError: () => {
      toast.error("Google Login Failed Try Again");
    },
  });

  return googleLogin;
};

export default UseGoogleLogin;
