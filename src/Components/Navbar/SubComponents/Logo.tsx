import LogoImg from "../../../Assets/logo.webp";

const Logo = () => {
  return (
    <div>
      <img
        className="cursor-pointer pb-3 "
        src={LogoImg}
        alt="Logo"
      
        width={130}
      />
    </div>
  );
};

export default Logo;
