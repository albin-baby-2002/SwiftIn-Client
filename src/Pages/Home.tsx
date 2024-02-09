
import { useEffect } from "react";
import LoginModal from "../Components/Modals/LoginModal";
import OtpModal from "../Components/Modals/OtpModal";
import RegisterModal from "../Components/Modals/RegisterModal";
import Navbar from "../Components/Navbar/Navbar";
import useAuth from "../Hooks/useAuth";

const Home = () => {
  
  const auth = useAuth()
  
  useEffect(()=>{
    
    console.log(auth.accessToken)
    
  },[auth.accessToken])
  
  return (
    <>
      <header>
        <Navbar />
      </header>
      
      <main>
        
        <RegisterModal/>
        <OtpModal/>
        <LoginModal/>
        
      </main>
    </>
  );
};

export default Home;
