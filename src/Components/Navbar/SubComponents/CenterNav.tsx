import { useNavigate } from "react-router-dom";

const CenterNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="  hidden items-center justify-between gap-3 md:flex ">
        <div
          className=" flex gap-6 rounded-full bg-black    px-8 py-3  font-Righteous text-[12px] tracking-wider text-white   shadow-md  
              "
        >
          <p
            className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200"
            onClick={() => navigate("/reservations")}
          >
            Reservations
          </p>
          <p
            className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200"
            onClick={() => navigate("/wishlist")}
          >
            {" "}
            Wishlists
          </p>
          <p
            className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200"
            onClick={() => navigate("/search")}
          >
            {" "}
            Hotels page
          </p>
        </div>
      </div>
    </>
  );
};

export default CenterNav;
