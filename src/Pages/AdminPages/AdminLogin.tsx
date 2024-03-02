import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Container from "../../Components/UiComponents/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../Components/Inputs/Input";
import { AUTH_URL } from "../../Api/EndPoints";
import swiftIn from "../../Assets/logo3.png";
import toast from "react-hot-toast";

import { useEffect } from "react";
import { Axios } from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { ROLES_LIST } from "../../Config/userRoles";
import useAuth from "../../Hooks/zustandStore/useAuth";
import Button from "../../Components/UiComponents/Button";
import { AdminLoginSchema } from "../../Schemas/adminLoginSchema";

interface AuthResponse {
  accessToken: string;
  roles: number[];
  username: string;
  image:string;
}

const AdminLogin = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(AdminLoginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data");

    try {
      const response = await Axios.post<AuthResponse>(AUTH_URL, data, {
        withCredentials: true,
      });

      // with credentials true is req for login req otherwise cookie will not be saved

      auth.setAuth(
        response.data.accessToken,
        response.data.roles,
        response.data.username,
        response.data.image
      );

      toast.success("login successful");

      navigate("/admin/users");
    } catch (err: any) {
      console.log(err);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 401) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else if (err.response?.status === 404) {
        toast.error("Email not registered. Please SignUp");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      if (auth.roles.includes(ROLES_LIST.Admin)) {
        navigate("/admin/users", { replace: true });
      } else {
        navigate("/", { replace: true });

        toast.error("UnAuthorized Route");
      }
    }
  }, []);

  return (
    <>
      <main className=" max-h-screen  overflow-y-hidden">
        <Container>
          <div className="  mx-auto my-10 flex   flex-col items-center  justify-center gap-4 rounded-lg border-2 py-12 shadow-md md:w-2/3 lg:w-2/5 ">
            <img src={swiftIn} alt="" height={100} width={100} />
            <h1 className=" font-sen  text-center text-2xl  font-bold">
              Welcome Back Admin
            </h1>

            <div className=" flex w-[80%] flex-col gap-6">
              <Input
                id="email"
                label="Email"
                register={register}
                errors={errors}
              />
              <Input
                id="password"
                label="Password"
                register={register}
                errors={errors}
              />

              <div className=" mt-2">
                <Button label="login" onClick={handleSubmit(onSubmit)} />
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default AdminLogin;
