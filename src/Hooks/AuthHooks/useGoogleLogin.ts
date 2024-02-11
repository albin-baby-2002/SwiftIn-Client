import React from 'react'
import { Axios } from '../../Api/Axios';
import { useGoogleLogin } from '@react-oauth/google';
import useRegisterModal from '../zustandStore/useRegisterModal';
import toast from 'react-hot-toast';
import useAuth from '../zustandStore/useAuth';
import LoginModal from '../../Components/Modals/LoginModal';
import useLoginModal from '../zustandStore/useLoginModal';

interface googleAuthResponse {
  accessToken: string;
  roles: number[];
  user: string;
}

const UseGoogleLogin = () => {
    
    const registerModal = useRegisterModal();
    
    const LoginModal = useLoginModal()
    
    const auth = useAuth();
  
    
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      try {
        const res = await Axios.post<googleAuthResponse>(
          "/auth/google",
          { code: response.code },
          { withCredentials: true },
        );

        auth.setAuth(res.data.accessToken, res.data.roles, res.data.user);
            
        if(registerModal.isOpen){
            
            registerModal.onClose();
        }
        else if (LoginModal.isOpen){
            
            LoginModal.onClose();
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

    
}

export default UseGoogleLogin
