import { useNavigate } from "react-router-dom";
import LogoImg from "../../../Assets/logo5.png";

const Logo = () => {
  
  const navigate = useNavigate();
  return (
    <div className=" rounded-xl bg-black px-3 py-2" onClick={()=>{navigate('/')}}>
      <img className="cursor-pointer  " src={LogoImg} alt="Logo" width={75} />
    </div>
  );
};

export default Logo;
