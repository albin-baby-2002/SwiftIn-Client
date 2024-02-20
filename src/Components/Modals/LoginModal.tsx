import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "../UiComponents/Heading";
import Button from "../UiComponents/Button";
import { FcGoogle } from "react-icons/fc";
import Modal from "./ParentModal/Modal";
import Input from "../Inputs/Input";

import { useState } from "react";
import toast from "react-hot-toast";
import { Axios } from "../../Api/Axios";
import { AUTH_URL } from "../../Api/EndPoints";
import useAuth from "../../Hooks/zustandStore/useAuth";
import { loginSchema } from "../../Schemas/loginSchema";
import UseGoogleLogin from "../../Hooks/AuthHooks/useGoogleLogin";

interface AuthResponse {
  accessToken: string;
  roles: number[];
  username: string;
}

const LoginModal = () => {
  const auth = useAuth();

  const loginModal = useLoginModal();

  const googleLogin = UseGoogleLogin();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const response = await Axios.post<AuthResponse>(AUTH_URL, data, {
        withCredentials: true,
      });

      // with credentials true is req for login req otherwise cookie will not be saved

      setIsLoading(false);

      auth.setAuth(
        response.data.accessToken,
        response.data.roles,
        response.data.username,
      );

      toast.success("login successful");

      loginModal.onClose();
    } catch (err: any) {
      setIsLoading(false);
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
        toast.error("Failed to identify user. Login again");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  const bodyContent = (
    <div>
      <Heading title="Welcome Back To SwiftIn" />

      <Input id="email" label="Email" errors={errors} register={register} />
      <Input
        id="password"
        label="password"
        errors={errors}
        register={register}
      />
    </div>
  );

  const footer = (
    <div className=" flex  flex-col items-center gap-4">
      <div className=" relative flex  w-full flex-col items-center justify-center">
        <div className="absolute  h-[1.25px] w-full  bg-gray-400"></div>

        <div className=" z-20 mb-1 bg-white px-4  font-semibold text-gray-400">
          or
        </div>
      </div>

      <Button
        label="Google"
        onClick={() => {
          googleLogin();
        }}
        outline={true}
        Icon={FcGoogle}
      />
    </div>
  );

  return (
    <Modal
      title="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={loginModal.isOpen}
      submitActionLabel="Login"
      body={bodyContent}
      footer={footer}
      disabled={isLoading}
    />
  );
};

export default LoginModal;
