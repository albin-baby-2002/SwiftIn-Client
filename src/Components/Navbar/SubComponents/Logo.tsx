import LogoImg from "../../../Assets/logo.png";

const Logo = () => {
  return (
    <div>
      <img
        className="cursor-pointer pb-3 "
        src={LogoImg}
        alt="Logo"
        height={130}
        width={130}
      />
    </div>
  );
};

export default Logo;
