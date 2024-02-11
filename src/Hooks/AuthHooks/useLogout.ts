import toast from "react-hot-toast";
import { Axios } from "../../Api/Axios";
import useAuth from "../zustandStore/useAuth";




const useLogout = () => {
    
    const Auth = useAuth();

  const logout = async () => {
    try {
      await Axios.get("/logout", {
        withCredentials: true,
      });
      
      Auth.onLogout()
      
      toast.success('Logged Out')

      
    } catch (err) {
      
        toast.error(
            'Logout Failed'
        )
    }
  };

  return logout;
};

export default useLogout;
