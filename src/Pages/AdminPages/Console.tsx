import { FaSearch } from "react-icons/fa";

import Container from "../../Components/UiComponents/Container";

import { IoIosAddCircle } from "react-icons/io";
import Navbar from "../../Components/Admin/Navbar/Navbar";
import { useEffect } from "react";
import useAxiosPrivate from "../../Hooks/AxiosPrivate/useAxiosPrivate";

const Console = () => {
  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosPrivate.get("/admin/users", {
          params: { search: "", page: 1 },
        });

        if (isMounted) {
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className=" flex  min-h-full ">
      <Navbar closeNav={() => {}} />

      <main>
        <Container>
          <div className=" flex my-6   justify-between text-sm ">
            <div className=" flex   gap-2">
              <div className=" flex items-center px-4 py-2  border-2  rounded-md border-neutral-400 gap-3">
                <FaSearch />
                <input
                  className="  text-black focus:outline-none "
                  type="text"
                  placeholder="Search by name  "
                />
              </div>

              <div className=" flex border-2  rounded-md border-neutral-500 shadow-lg px-4 py-2 font-semibold  items-center gap-2  ">
                <IoIosAddCircle className=" text-lg font-bold" />

                <p>Add</p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Console;
