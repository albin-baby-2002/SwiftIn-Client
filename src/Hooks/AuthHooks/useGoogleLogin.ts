import { Axios } from "../../Api/Axios";
import { useGoogleLogin } from "@react-oauth/google";
import useRegisterModal from "../zustandStore/useRegisterModal";
import toast from "react-hot-toast";
import useAuth from "../zustandStore/useAuth";
import useLoginModal from "../zustandStore/useLoginModal";
import { GOOGLE_AUTH_URL } from "../../Api/EndPoints";

interface googleAuthResponse {
  accessToken: string;
  roles: number[];
  user: string;
}

const UseGoogleLogin = () => {
  const registerModalState = useRegisterModal();

  const LoginModalState = useLoginModal();

  const auth = useAuth();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      try {
        const res = await Axios.post<googleAuthResponse>(
          GOOGLE_AUTH_URL,
          { code: response.code },
          { withCredentials: true },
        );

        auth.setAuth(res.data.accessToken, res.data.roles, res.data.user);

        if (registerModalState.isOpen) {
          registerModalState.onClose();
        } else if (LoginModalState.isOpen) {
          LoginModalState.onClose();
        }

        let message = `Welcome to SwiftIn ${res.data.user}`;

        toast.success(message);
      } catch (err) {
        toast.error("Google Login Failed Try Again");
        console.log(err);
      }
    },
    onError: (err) => {
      toast.error("Google Login Failed Try Again");
      console.log(err);
    },
  });

  return googleLogin;
};

export default UseGoogleLogin;
