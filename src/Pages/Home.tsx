
import LoginModal from "../Components/Modals/LoginModal";
import OtpModal from "../Components/Modals/OtpModal";
import RegisterModal from "../Components/Modals/RegisterModal";
import Navbar from "../Components/Navbar/Navbar";

const Home = () => {
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