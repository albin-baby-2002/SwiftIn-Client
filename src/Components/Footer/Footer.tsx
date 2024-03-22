import { TFooterProps } from "../../Types/GeneralTypes/propsTypes";

const Footer: React.FC<TFooterProps> = ({ bg }) => {
  return (
    <div
      className={`${bg ? bg : "bg-slate-200 "} mx-auto   flex   max-w-[1500px] items-center  justify-between      px-10  pb-7 pt-5 font-Sen`}
    >
      <div>
        <img
          className="hidden cursor-pointer sm:block    "
          src={
            "https://res.cloudinary.com/dfm8vhuea/image/upload/v1709179408/f1asvgvdlhfvhowhsnjf.png"
          }
          alt="Logo"
          width={80}
        />
        <img
          className=" cursor-pointer sm:hidden    "
          src={
            "https://res.cloudinary.com/dfm8vhuea/image/upload/v1709179408/f1asvgvdlhfvhowhsnjf.png"
          }
          alt="Logo"
          width={50}
        />
      </div>

      <div className=" flex gap-2 text-[10px] font-semibold  md:gap-4 md:text-xs">
        <p>About Us</p>
        <p>Contact</p>
        <p>License</p>
        <p>Copyrights</p>
      </div>
    </div>
  );
};

export default Footer;
