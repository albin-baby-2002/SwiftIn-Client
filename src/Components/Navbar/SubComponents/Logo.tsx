import { useNavigate } from "react-router-dom";

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
        className="hidden cursor-pointer sm:block   "
        src={
          "https://res.cloudinary.com/dfm8vhuea/image/upload/b_rgb:000000/qhxi2b8uu3wgvvnnyrng.jpg"
        }
        alt="Logo"
        width={85}
      />

      <img
        className="cursor-pointer sm:hidden   "
        src={
          "https://res.cloudinary.com/dfm8vhuea/image/upload/b_rgb:000000/qhxi2b8uu3wgvvnnyrng.jpg"
        }
        alt="Logo"
        width={65}
      />
    </div>
  );
};

export default Logo;
