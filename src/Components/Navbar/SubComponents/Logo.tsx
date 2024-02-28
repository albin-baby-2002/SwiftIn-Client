import { useNavigate } from "react-router-dom";
import LogoImg from "../../../Assets/logo5.png";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className=" rounded-xl bg-black px-3 py-2"
      onClick={() => {
        navigate("/");
      }}
    >
      <img
        className="cursor-pointer   "
        src={
          "https://res.cloudinary.com/dfm8vhuea/image/upload/b_rgb:000000/qhxi2b8uu3wgvvnnyrng.jpg"
        }
        alt="Logo"
        width={85}
      />
    </div>
  );
};

export default Logo;
