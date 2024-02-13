import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import useLoginModal from "../../Hooks/zustandStore/useLoginModal";
import Heading from "../UiComponents/Heading";
import Input from "../Inputs/Input";
import Modal from "./Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../UiComponents/Button";
import { FcGoogle } from "react-icons/fc";

import { Axios } from "../../Api/Axios";
import { AUTH_URL } from "../../Api/EndPoints";
import useAuth from "../../Hooks/zustandStore/useAuth";
import toast from "react-hot-toast";
import UseGoogleLogin from "../../Hooks/AuthHooks/useGoogleLogin";

interface AuthResponse {
  accessToken: string;
  roles: number[];
  username: string;
}

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum length is 8"),
});

const LoginModal = () => {
  const auth = useAuth();

  const loginModal = useLoginModal();

  const googleLogin = UseGoogleLogin();

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

      loginModal.onClose();
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
    />
  );
};

export default LoginModal;
