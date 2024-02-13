import Container from "../../Components/UiComponents/Container";
import Input from "../../Components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import swiftIn from "../../Assets/logo3.png";
import Button from "../../Components/UiComponents/Button";
import { AUTH_URL } from "../../Api/EndPoints";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { Axios } from "../../Api/Axios";
import { ROLES_LIST } from "../../Config/userRoles";

interface AuthResponse {
  accessToken: string;
  roles: number[];
  username: string;
}

const AdminLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "password is min 8 character long"),
});

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
      );

      toast.success("login successful");

      navigate("/admin");
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
        toast.error("Registration Failed");
      }
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      if (auth.roles.includes(ROLES_LIST.Admin)) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });

        toast.error("UnAuthorized Route");
      }
    }
  }, []);

  return (
    <>
      <main>
        <Container>
          <div className=" w-1/2 mx-auto flex  flex-col items-center  justify-center h-screen gap-8">
            <img src={swiftIn} alt="" height={150} width={150} />
            <h1 className=" text-3xl  font-Righteous  font-bold">
              Welcome Back Admin
            </h1>

            <div className=" w-[80%] flex flex-col gap-6">
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
