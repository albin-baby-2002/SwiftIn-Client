import z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";

import Modal from "./Modal";
import Heading from "../UiComponents/Heading";
import Input from "../Inputs/Input";
import Button from "../UiComponents/Button";

import useRegisterModal from "../../Hooks/zustandStore/useRegisterModal";
import { Axios } from "../../Api/Axios";
import toast from "react-hot-toast";
import { REGISTER_URL } from "../../Api/EndPoints";
import useOtpModal from "../../Hooks/zustandStore/useOtpModal";
import { useGoogleLogin } from "@react-oauth/google";
import useAuth from "../../Hooks/zustandStore/useAuth";
import UseGoogleLogin from "../../Hooks/AuthHooks/useGoogleLogin";

interface UserData {
  userId: string;
  email: string;
}

interface googleAuthResponse {
  accessToken: string;
  roles: number[];
  user: string;
}

// zod schema for validating react hook form

const SignUpSchema = z

  .object({
    email: z.string().email("Enter a valid email"),
    username: z.string().min(5, "user name should have min 5 character"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "minimum 8 char & min one (uppercase & lowercase letter, special char & number)",
        },
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password does not match original password",
    path: ["confirmPassword"],
  });

const RegisterModal = () => {
  // registerModal , otpModal state management Zustand

  const registerModal = useRegisterModal();

  const otpModal = useOtpModal();

  const auth = useAuth();

  const googleLogin = UseGoogleLogin();

  // loading state

  const [isLoading, setIsLoading] = useState(false);

  // react hook form with default values and zod for validation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  // onSubmit function to pass as callback for handleSubmit of react hook form

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await Axios.post<UserData>(REGISTER_URL, data);

      toast.success("User created successfully");

      setIsLoading(false);

      otpModal.setData(response.data.userId, response.data.email);

      registerModal.onClose();

      otpModal.onOpen();
    } catch (err: any) {
      setIsLoading(false);

      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 409) {
        toast.error("Email Already Registered");
      } else if (err.response?.status === 500) {
        toast.error("Oops! Something went wrong. Please try again later.");
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  // const googleLogin = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: async (response) => {
  //     try {
  //       const res = await Axios.post<googleAuthResponse>(
  //         "/auth/google",
  //         { code: response.code },
  //         { withCredentials: true },
  //       );

  //       auth.setAuth(res.data.accessToken, res.data.roles, res.data.user);

  //       registerModal.onClose();

  //       let message = `Welcome to SwiftIn ${res.data.user}`;

  //       toast.success(message);
  //     } catch (err) {
  //       toast.error("Google Login Failed Try Again");
  //       console.log(err);
  //     }
  //   },
  //   onError: (err) => {
  //     toast.error("Google Login Failed Try Again");
  //     console.log(err);
  //   },
  // });

  // body content for input form

  const bodyContent = (
    <div className=" flex flex-col gap-1">
      <Heading title="Welcome to SwiftIn" />

      <div className=" flex gap-3 flex-col">
        <Input
          id="username"
          label="Username"
          register={register}
          errors={errors}
        />
        <Input id="email" label="Email" register={register} errors={errors} />
        <Input
          id="password"
          label="Password"
          register={register}
          errors={errors}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );

  // footer content for modal - google and gitHub oAuth buttons

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

  // actual model made from boiler plate modal

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      submitActionLabel="continue"
      body={bodyContent}
      footer={footer}
    />
  );
};

export default RegisterModal;
