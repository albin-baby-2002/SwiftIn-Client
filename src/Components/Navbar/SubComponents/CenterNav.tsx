const CenterNav = () => {
  return (
    <>
      <div className="  hidden items-center justify-between gap-3 md:flex ">
        <div
          className=" flex gap-6 rounded-full bg-black    px-8 py-3  font-Righteous text-[12px] tracking-wider text-white   shadow-md  
              "
        >
          <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
            Reservations
          </p>
          <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
            {" "}
            Wishlists
          </p>
          <p className=" transform cursor-pointer  transition duration-200 hover:scale-110 hover:text-neutral-200">
            {" "}
            Contact Us
          </p>
        </div>
      </div>
    </>
  );
};

export default CenterNav;
