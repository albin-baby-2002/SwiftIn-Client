import swiftIn from "../../Assets/logo3.png";
import Container from "../../Components/Container";
import { NavLink, Outlet } from "react-router-dom";

const Users = () => {
  return (
    <>
      <header>
        <nav>
          <Container>
            <div className=" py-5 border-b-2 flex  justify-between">
              <div className=" font-Sen  text-xl font-extrabold  leading-tight">
                <p>Admin</p>
                <p>Dashboard</p>
              </div>

              <div className=" flex  font-Sen gap-8 font-bold items-center text-lg">
                <NavLink
                  to="/admin/console"
                  className={({ isActive }) =>
                    isActive ? " bg-black px-3 py-1 rounded-xl text-white" : ""
                  }
                >
                  <p>Console</p>
                </NavLink>

                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-black px-3 py-1 rounded-xl text-white"
                      : " px-3 py-1 rounded-xl hover:bg-black/25  transition-all  duration-150"
                  }
                >
                  <p>Users</p>
                </NavLink>

                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-black text-white"
                      : "  px-3 py-1 rounded-xl hover:bg-black/25  transition-all  duration-150"
                  }
                >
                  <p>Listings</p>
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? " bg-black text-white"
                      : "  px-3 py-1 rounded-xl hover:bg-black/25  transition-all  duration-150"
                  }
                >
                  <p>Hosts</p>
                </NavLink>
              </div>

              <div className=" flex items-center">
                <img src={swiftIn} alt="" height={110} width={110} />
              </div>
            </div>
          </Container>
        </nav>
      </header>
    </>
  );
};

export default Users;
